---
name: solid-clean-code
description: "Applies SOLID principles and Clean Code standards to TypeScript/Vue/Nuxt and PHP/Laravel code. Only activated when explicitly requested by the user (e.g., 'apply SOLID', 'clean code review', 'refactor using SOLID'). Analyzes code for principle violations and provides expert-level refactoring guidance."
---

# SOLID Principles & Clean Code

An expert-level skill for applying the 5 SOLID principles and Clean Code standards to **TypeScript/Vue/Nuxt** and PHP/Laravel projects. This skill is written from the perspective of a senior engineer with 15+ years of experience who has seen codebases grow from startup to enterprise scale. All principles are demonstrated with TypeScript/Vue examples as the primary language, with PHP/Laravel examples as secondary reference.

---

## ⚠️ Activation Rules

**This skill is NOT automatically active.** It is ONLY invoked when:

- The user explicitly says: "طبق مبدأ SOLID", "SOLID pattern", "apply SOLID", "clean code", "refactor using SOLID", "مراجعة SOLID", "clean code review".
- The user explicitly requests a **refactoring** session focused on principles and architecture.
- The user asks: "Is this code SOLID?", "Does this follow clean code?", "هل الكود نظيف؟".

**Do NOT apply this skill** during normal feature development, bug fixing, or code generation unless the user explicitly requests it.

---

## How to use it

When activated, follow these steps:

### Step 0 — Identify Target Code

1. Ask the user which files or code to review, OR detect from `git diff`.
2. Read the code carefully and understand its purpose.
3. Map each class/method to the SOLID principle it may violate.

### Step 1 — Analyze Against All 5 SOLID Principles

Review the code against each principle below. For every violation found, provide:

- **The principle violated**
- **The exact code that violates it**
- **Why it's a violation** (impact on maintainability, testability, scalability)
- **The refactored solution** with before/after code

### Step 2 — Analyze Against Clean Code Principles

After SOLID, review against DRY, KISS, YAGNI, and code smell detection.

### Step 3 — Generate Report

Output a structured report following the template in Section 4.

---

## 1. SOLID Principles (Deep Analysis)

### 1.1 — S: Single Responsibility Principle (SRP)

> **"A class should have only one reason to change."**

A class that handles multiple concerns becomes fragile — changing one concern risks breaking the others. In Laravel, this is the most commonly violated principle.

**How to detect violations:**

- Controller methods longer than 10 lines of logic
- Service classes that handle both business logic AND infrastructure (email, file storage)
- Models that contain business rules, validation, AND formatting
- Methods with "AND" in their description: "This method validates AND saves AND sends notification"

**❌ VIOLATION — Controller doing everything:**

```php
<?php

declare(strict_types=1);

final class OrderController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // ❌ Validation (should be in FormRequest)
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // ❌ Business logic (should be in Service/Action)
        $product = Product::findOrFail($validated['product_id']);

        if ($product->stock < $validated['quantity']) {
            return response()->json(['error' => 'Insufficient stock'], 422);
        }

        $total = $product->price * $validated['quantity'];
        $tax = $total * 0.15;

        // ❌ Persistence (should be in Service/Action)
        $order = Order::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total' => $total + $tax,
        ]);

        $product->decrement('stock', $validated['quantity']);

        // ❌ Side effect (should be Event + Listener)
        Mail::to($request->user())->send(new OrderConfirmation($order));

        return response()->json($order, 201);
    }
}
```

**✅ REFACTORED — Each class has ONE responsibility:**

```php
<?php

declare(strict_types=1);

// 1️⃣ FormRequest — ONLY validates input
final class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ];
    }
}

// 2️⃣ Action — ONLY executes business logic for creating an order
final class CreateOrderAction
{
    public function execute(User $user, Product $product, int $quantity): Order
    {
        if ($product->stock < $quantity) {
            throw new InsufficientStockException($product, $quantity);
        }

        $total = $product->price * $quantity;
        $tax = $total * config('tax.rate');

        $order = DB::transaction(function () use ($user, $product, $quantity, $total, $tax): Order {
            $order = Order::create([
                'user_id' => $user->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'total' => $total + $tax,
            ]);

            $product->decrement('stock', $quantity);

            return $order;
        });

        OrderPlaced::dispatch($order);

        return $order;
    }
}

// 3️⃣ Controller — ONLY coordinates HTTP request/response
final class OrderController extends Controller
{
    public function store(
        StoreOrderRequest $request,
        CreateOrderAction $action,
    ): JsonResponse {
        $product = Product::findOrFail($request->validated('product_id'));

        $order = $action->execute(
            user: $request->user(),
            product: $product,
            quantity: $request->validated('quantity'),
        );

        return sendResponse(
            result: new OrderResource($order),
            message: 'Order created successfully.',
            code: 201,
        );
    }
}

// 4️⃣ Listener — ONLY handles email side-effect
final class SendOrderConfirmationListener implements ShouldQueue
{
    public function handle(OrderPlaced $event): void
    {
        $event->order->user->notify(
            new OrderConfirmationNotification($event->order),
        );
    }
}
```

**SRP Rule of Thumb:**

```
Controller     → HTTP concerns only (max 5-7 lines of logic)
FormRequest    → Validation + Authorization only
Action/Service → Business logic only (one operation per Action)
Model          → Relationships, scopes, casts, accessors only
Event+Listener → Side effects only (notifications, email, cache clearing)
Resource       → Response transformation only
Policy         → Authorization rules only
Observer       → Persistence-related hooks only (auto-setting fields)
```

---

### 1.2 — O: Open/Closed Principle (OCP)

> **"Software entities should be open for extension but closed for modification."**

You should be able to add new behavior WITHOUT changing existing, tested code. This is achieved through **interfaces**, **polymorphism**, and **strategy patterns**.

**How to detect violations:**

- Long `if/else` or `switch` chains that grow when a new type/status is added
- Methods that check `instanceof` to decide behavior
- Adding a new payment method/notification channel requires editing an existing class

**❌ VIOLATION — Must modify existing code to add new payment method:**

```php
<?php

declare(strict_types=1);

final class PaymentService
{
    public function charge(Order $order, string $method): void
    {
        // ❌ Every new payment method requires modifying THIS class
        if ($method === 'stripe') {
            // Stripe API call...
        } elseif ($method === 'paypal') {
            // PayPal API call...
        } elseif ($method === 'apple_pay') {
            // Apple Pay API call...
        }
        // Adding "mada" or "stcpay" means editing this tested method
    }
}
```

**✅ REFACTORED — Add new payment methods without touching existing code:**

```php
<?php

declare(strict_types=1);

// 1️⃣ Contract (Interface)
interface PaymentGatewayInterface
{
    public function charge(Order $order, int $amountInCents): PaymentResult;
    public function refund(string $transactionId, int $amountInCents): RefundResult;
}

// 2️⃣ Implementations — each in its own file
final class StripeGateway implements PaymentGatewayInterface
{
    public function charge(Order $order, int $amountInCents): PaymentResult
    {
        // Stripe-specific logic
    }

    public function refund(string $transactionId, int $amountInCents): RefundResult
    {
        // Stripe-specific refund
    }
}

final class PayPalGateway implements PaymentGatewayInterface
{
    public function charge(Order $order, int $amountInCents): PaymentResult
    {
        // PayPal-specific logic
    }

    public function refund(string $transactionId, int $amountInCents): RefundResult
    {
        // PayPal-specific refund
    }
}

// 3️⃣ Adding "mada" = create new class, ZERO changes to existing code
final class MadaGateway implements PaymentGatewayInterface
{
    public function charge(Order $order, int $amountInCents): PaymentResult { /* ... */ }
    public function refund(string $transactionId, int $amountInCents): RefundResult { /* ... */ }
}

// 4️⃣ Service — depends on interface, works with ANY gateway
final class PaymentService
{
    public function __construct(
        private readonly PaymentGatewayInterface $gateway,
    ) {}

    public function processPayment(Order $order): PaymentResult
    {
        return $this->gateway->charge($order, $order->total_in_cents);
    }
}

// 5️⃣ Binding in ServiceProvider
$this->app->bind(PaymentGatewayInterface::class, function () {
    return match (config('payment.default')) {
        'stripe' => new StripeGateway(config('payment.stripe')),
        'paypal' => new PayPalGateway(config('payment.paypal')),
        'mada' => new MadaGateway(config('payment.mada')),
    };
});
```

**OCP Checklist:**

```
✅ New behavior = New class implementing existing interface
✅ Existing classes remain UNTOUCHED
✅ Use config/environment to switch implementations
❌ New behavior = Editing existing if/else or switch
❌ Adding new type requires modifying multiple files
```

---

### 1.3 — L: Liskov Substitution Principle (LSP)

> **"Subtypes must be substitutable for their base types without altering program correctness."**

If class B extends class A, you should be able to replace A with B anywhere and the program must still work correctly — no surprises, no broken contracts.

**How to detect violations:**

- A subclass throws an exception the parent doesn't
- A subclass changes the return type or behavior unexpectedly
- A method checks `instanceof` to handle different subclass behaviors
- An overridden method silently does nothing (empty implementation)

**❌ VIOLATION — Subclass breaks the contract:**

```php
<?php

declare(strict_types=1);

interface NotificationChannelInterface
{
    public function send(User $user, string $message): bool;
}

final class EmailChannel implements NotificationChannelInterface
{
    public function send(User $user, string $message): bool
    {
        // ✅ Sends email — returns true/false as expected
        Mail::to($user->email)->send(new GenericNotification($message));
        return true;
    }
}

final class SmsChannel implements NotificationChannelInterface
{
    public function send(User $user, string $message): bool
    {
        // ❌ VIOLATION — throws exception instead of returning bool
        // Calling code expects true/false, but gets an exception!
        if (! $user->phone) {
            throw new \RuntimeException('User has no phone number');
        }

        // ❌ VIOLATION — returns void (no return statement)
        SmsProvider::send($user->phone, $message);
    }
}
```

**✅ REFACTORED — Both implementations honor the contract:**

```php
<?php

declare(strict_types=1);

final class SmsChannel implements NotificationChannelInterface
{
    public function send(User $user, string $message): bool
    {
        if (! $user->phone) {
            return false; // ✅ Honors the contract — returns bool
        }

        return SmsProvider::send($user->phone, $message); // ✅ Returns bool
    }
}
```

**LSP Rules:**

```
✅ Same input types → Same output types
✅ Same method signature → Same behavioral contract
✅ No unexpected exceptions that the base type doesn't declare
✅ Can swap any implementation without the caller knowing
❌ Overriding a method with empty body (silent failure)
❌ Throwing exceptions the base type doesn't throw
❌ Returning different types or structures
```

---

### 1.4 — I: Interface Segregation Principle (ISP)

> **"No client should be forced to depend on interfaces it does not use."**

Large, monolithic interfaces force classes to implement methods they don't need — leading to empty methods, `throw new \BadMethodCallException()`, or methods that return null silently.

**How to detect violations:**

- An interface with 5+ methods where most implementors only need 2-3
- Classes implementing interface methods with empty bodies or `throw`
- A "UserInterface" that has methods for both customer AND admin operations

**❌ VIOLATION — One huge interface forces unnecessary implementations:**

```php
<?php

declare(strict_types=1);

// ❌ Monolithic interface — forces ALL implementors to define ALL methods
interface FileStorageInterface
{
    public function upload(UploadedFile $file): string;
    public function download(string $path): StreamedResponse;
    public function delete(string $path): bool;
    public function generateThumbnail(string $path, int $width, int $height): string;
    public function getMetadata(string $path): array;
    public function setPermissions(string $path, string $visibility): bool;
    public function streamVideo(string $path): StreamedResponse;
}

// ❌ This storage only handles documents — forced to implement thumbnail and video
final class DocumentStorage implements FileStorageInterface
{
    public function upload(UploadedFile $file): string { /* works */ }
    public function download(string $path): StreamedResponse { /* works */ }
    public function delete(string $path): bool { /* works */ }

    // ❌ FORCED to implement — documents don't have thumbnails!
    public function generateThumbnail(string $path, int $width, int $height): string
    {
        throw new \BadMethodCallException('Not supported');
    }

    public function getMetadata(string $path): array { /* works */ }
    public function setPermissions(string $path, string $visibility): bool { /* works */ }

    // ❌ FORCED to implement — documents don't stream as video!
    public function streamVideo(string $path): StreamedResponse
    {
        throw new \BadMethodCallException('Not supported');
    }
}
```

**✅ REFACTORED — Small, focused interfaces:**

```php
<?php

declare(strict_types=1);

// 1️⃣ Core file operations (everyone needs these)
interface FileStorageInterface
{
    public function upload(UploadedFile $file): string;
    public function download(string $path): StreamedResponse;
    public function delete(string $path): bool;
}

// 2️⃣ Only for files that support thumbnails
interface HasThumbnailInterface
{
    public function generateThumbnail(string $path, int $width, int $height): string;
}

// 3️⃣ Only for media that supports streaming
interface StreamableInterface
{
    public function streamVideo(string $path): StreamedResponse;
}

// 4️⃣ Only for storages that support access control
interface HasPermissionsInterface
{
    public function setPermissions(string $path, string $visibility): bool;
}

// ✅ Document storage — implements only what it needs
final class DocumentStorage implements FileStorageInterface
{
    public function upload(UploadedFile $file): string { /* ... */ }
    public function download(string $path): StreamedResponse { /* ... */ }
    public function delete(string $path): bool { /* ... */ }
}

// ✅ Image storage — implements core + thumbnails
final class ImageStorage implements FileStorageInterface, HasThumbnailInterface
{
    public function upload(UploadedFile $file): string { /* ... */ }
    public function download(string $path): StreamedResponse { /* ... */ }
    public function delete(string $path): bool { /* ... */ }
    public function generateThumbnail(string $path, int $width, int $height): string { /* ... */ }
}

// ✅ Video storage — implements core + streaming + thumbnails
final class VideoStorage implements FileStorageInterface, HasThumbnailInterface, StreamableInterface
{
    public function upload(UploadedFile $file): string { /* ... */ }
    public function download(string $path): StreamedResponse { /* ... */ }
    public function delete(string $path): bool { /* ... */ }
    public function generateThumbnail(string $path, int $width, int $height): string { /* ... */ }
    public function streamVideo(string $path): StreamedResponse { /* ... */ }
}
```

**ISP Rules:**

```
✅ 1-4 methods per interface (focused, cohesive)
✅ Every method in the interface is needed by EVERY implementor
✅ A class can implement multiple small interfaces
❌ Interface with 5+ methods → likely needs splitting
❌ Implementors with empty methods or throw BadMethodCallException
❌ "God interface" that mixes different concerns
```

---

### 1.5 — D: Dependency Inversion Principle (DIP)

> **"High-level modules should not depend on low-level modules. Both should depend on abstractions."**

Your business logic (high-level) should never directly depend on specific infrastructure (low-level). Both should depend on interfaces.

**How to detect violations:**

- Constructor injects concrete classes instead of interfaces
- Using `new ConcreteClass()` inside business logic
- Changing the email provider requires editing business logic code
- Business logic directly calls `Http::`, `Mail::`, or filesystem operations

**❌ VIOLATION — Business logic tightly coupled to infrastructure:**

```php
<?php

declare(strict_types=1);

final class UserRegistrationService
{
    public function __construct(
        // ❌ Depends on CONCRETE class — cannot swap without editing this code
        private readonly StripeService $stripe,
        // ❌ Depends on CONCRETE class — locked to Mailchimp forever
        private readonly MailchimpService $newsletter,
    ) {}

    public function register(array $data): User
    {
        $user = User::create($data);

        // ❌ Tightly coupled to Stripe
        $this->stripe->createCustomer($user->email);

        // ❌ Tightly coupled to Mailchimp
        $this->newsletter->subscribe($user->email);

        return $user;
    }
}
```

**✅ REFACTORED — Depends on abstractions, not concretions:**

```php
<?php

declare(strict_types=1);

// 1️⃣ Abstractions (interfaces)
interface PaymentProviderInterface
{
    public function createCustomer(string $email): string;
}

interface NewsletterServiceInterface
{
    public function subscribe(string $email): bool;
}

// 2️⃣ Business logic depends on INTERFACES
final class UserRegistrationService
{
    public function __construct(
        private readonly PaymentProviderInterface $paymentProvider,    // ✅ Interface
        private readonly NewsletterServiceInterface $newsletterService, // ✅ Interface
    ) {}

    public function register(array $data): User
    {
        $user = User::create($data);
        $this->paymentProvider->createCustomer($user->email);
        $this->newsletterService->subscribe($user->email);

        return $user;
    }
}

// 3️⃣ Concrete implementations
final class StripePaymentProvider implements PaymentProviderInterface
{
    public function createCustomer(string $email): string { /* Stripe API */ }
}

final class MailchimpNewsletterService implements NewsletterServiceInterface
{
    public function subscribe(string $email): bool { /* Mailchimp API */ }
}

// 4️⃣ Bind in ServiceProvider — swap implementation in ONE place
$this->app->bind(PaymentProviderInterface::class, StripePaymentProvider::class);
$this->app->bind(NewsletterServiceInterface::class, MailchimpNewsletterService::class);
```

**DIP Benefits:**

```
✅ Swap Stripe → PayPal = change ONE line in ServiceProvider
✅ Unit tests = inject mock implementation
✅ Business logic never changes when infrastructure changes
✅ Multiple teams can work in parallel (one on business logic, one on integration)
```

---

## 2. Clean Code Principles

### 2.1 — DRY (Don't Repeat Yourself)

**Detect**: Same logic appearing in 2+ places.
**Fix**: Extract into a method, scope, trait, or service.

```php
// ❌ DRY VIOLATION — Same filtering logic in 3 places
// In Controller:
$activeUsers = User::where('status', 'active')->where('email_verified_at', '!=', null)->get();
// In Command:
$activeUsers = User::where('status', 'active')->where('email_verified_at', '!=', null)->get();
// In Job:
$activeUsers = User::where('status', 'active')->where('email_verified_at', '!=', null)->get();

// ✅ FIX — Extract to local scope (defined ONCE in Model)
// In User model:
public function scopeActiveVerified(Builder $query): Builder
{
    return $query->where('status', 'active')->whereNotNull('email_verified_at');
}

// Usage everywhere:
$activeUsers = User::activeVerified()->get();
```

### 2.2 — KISS (Keep It Simple, Stupid)

**Detect**: Over-engineered solutions for simple problems.
**Fix**: Use the simplest approach that works.

```php
// ❌ OVER-ENGINEERED — Abstract factory for 2 simple notifications
interface NotificationFactoryInterface { ... }
class NotificationFactoryAbstract implements NotificationFactoryInterface { ... }
class EmailNotificationFactory extends NotificationFactoryAbstract { ... }
class SmsNotificationFactory extends NotificationFactoryAbstract { ... }
class NotificationFactoryRegistry { ... }

// ✅ KISS — Simple and clear
$user->notify(new OrderShipped($order));
```

### 2.3 — YAGNI (You Ain't Gonna Need It)

**Detect**: Building features "just in case" or "for the future."
**Fix**: Build only what is needed NOW. Refactor when the need arises.

```php
// ❌ YAGNI — Building a full repository pattern for simple CRUD
interface UserRepositoryInterface { ... }
class EloquentUserRepository implements UserRepositoryInterface { ... }
class CacheableUserRepository implements UserRepositoryInterface { ... }
// → You will NEVER switch from Eloquent to raw SQL. This is wasted abstraction.

// ✅ YAGNI — Use Eloquent directly until complexity demands otherwise
User::where('status', 'active')->paginate(20);
```

### 2.4 — Code Smells Detection

When reviewing code, flag these smells:

| Code Smell                   | Indicator                                             | Fix                                         |
| ---------------------------- | ----------------------------------------------------- | ------------------------------------------- |
| **Long Method**              | Method > 15 lines of logic                            | Extract into smaller methods                |
| **Long Parameter List**      | Method with > 3 parameters                            | Use DTO or FormRequest                      |
| **God Class**                | Class with > 300 lines or > 10 methods                | Split by responsibility                     |
| **Feature Envy**             | Method uses more data from another class than its own | Move method to that class                   |
| **Primitive Obsession**      | Using strings/ints for status, types, currencies      | Use Backed Enums                            |
| **Dead Code**                | Unused methods, variables, imports                    | Remove them                                 |
| **Magic Numbers**            | Hardcoded `0.15`, `60`, `1000`                        | Use constants or config                     |
| **Deep Nesting**             | 3+ levels of if/else/for                              | Use early returns, guard clauses            |
| **Boolean Parameters**       | `function process($order, true, false)`               | Use named arguments or split into 2 methods |
| **Comments Explaining What** | `// increment counter` before `$counter++`            | Code should be self-explanatory             |

**Deep Nesting Fix — Guard Clauses:**

```php
// ❌ BAD — Deep nesting
public function processOrder(Order $order): void
{
    if ($order->status === OrderStatus::Pending) {
        if ($order->items->isNotEmpty()) {
            if ($order->user->hasValidPayment()) {
                // finally, the actual logic...
            }
        }
    }
}

// ✅ GOOD — Guard clauses (early returns)
public function processOrder(Order $order): void
{
    if ($order->status !== OrderStatus::Pending) {
        return;
    }

    if ($order->items->isEmpty()) {
        throw new EmptyOrderException($order);
    }

    if (! $order->user->hasValidPayment()) {
        throw new InvalidPaymentException($order->user);
    }

    // Clean, flat logic here
}
```

---

## 3. SOLID Violation Severity Classification

When reporting violations, classify them by severity:

| Severity          | Criteria                                                                | Action                     |
| ----------------- | ----------------------------------------------------------------------- | -------------------------- |
| 🔴 **Critical**   | Violates DIP in core business logic (tightly coupled to infrastructure) | Must refactor before merge |
| 🔴 **Critical**   | God Class (> 500 lines, > 15 methods)                                   | Must split immediately     |
| 🟡 **Warning**    | Violates SRP (controller > 15 lines of logic)                           | Should refactor            |
| 🟡 **Warning**    | Violates OCP (switch/if-else chains with 4+ branches)                   | Should use polymorphism    |
| 🟡 **Warning**    | Violates ISP (interface with unused methods)                            | Should split interface     |
| 💡 **Suggestion** | Minor DRY violation (2 occurrences of same logic)                       | Consider extracting        |
| 💡 **Suggestion** | Could benefit from named arguments for clarity                          | Nice improvement           |

---

## 4. Report Template

When generating a SOLID/Clean Code review, use this format:

```markdown
# 🏗️ SOLID & Clean Code Review Report

## 📋 Summary

- **Files Reviewed**: [count]
- **Overall SOLID Score**: [⭐ out of 5]
- **Critical Violations**: [count]
- **Warnings**: [count]

## 🔴 SOLID Violations Found

### [S/O/L/I/D] — [Principle Name]

- **File**: `path/to/file.php:L42`
- **Violation**: [What's wrong]
- **Impact**: [Why it matters — maintainability, testability, scalability]
- **Before**: [Current code]
- **After**: [Refactored code]

## 🧹 Clean Code Issues

### [DRY/KISS/YAGNI/Smell]

- **File**: `path/to/file.php:L15`
- **Issue**: [Description]
- **Fix**: [Recommendation]

## 📊 SOLID Scorecard

| Principle                 | Score      | Notes |
| ------------------------- | ---------- | ----- |
| S — Single Responsibility | ⭐⭐⭐⭐⭐ |       |
| O — Open/Closed           | ⭐⭐⭐⭐⭐ |       |
| L — Liskov Substitution   | ⭐⭐⭐⭐⭐ |       |
| I — Interface Segregation | ⭐⭐⭐⭐⭐ |       |
| D — Dependency Inversion  | ⭐⭐⭐⭐⭐ |       |
| DRY                       | ⭐⭐⭐⭐⭐ |       |
| KISS                      | ⭐⭐⭐⭐⭐ |       |
```

---

## Best Practices & Rules

### Mandatory Rules

- **MUST** analyze ALL 5 SOLID principles for every review — never skip a principle.
- **MUST** provide before/after code examples for every violation found.
- **MUST** classify violations by severity (🔴 Critical, 🟡 Warning, 💡 Suggestion).
- **MUST** consider Laravel's conventions — SOLID in Laravel is different from generic PHP SOLID.
- **MUST** use the report template for structured output.

### Expert Judgment Rules

- **MUST NOT** force abstraction where simplicity is better — YAGNI takes priority over DIP for simple CRUD.
- **MUST NOT** recommend Repository pattern for basic Eloquent operations — only for complex multi-source data access.
- **MUST NOT** recommend interfaces for classes with only ONE implementation — interfaces are for polymorphism, not decoration.
- **MUST NOT** split classes that are naturally cohesive — SRP means "one reason to change", not "one method per class."
- **MUST** consider the project's scale — a startup MVP has different SOLID needs than an enterprise app.

### Practical Rules

- **MUST** explain WHY each principle matters in the specific context — not just theory.
- **MUST** show the concrete impact: "This will break when you add a new payment method" is better than "This violates OCP."
- **MUST NOT** refactor code unless the user explicitly asks — this skill only REVIEWS and REPORTS.
- **MUST** prioritize findings — not all violations are equally urgent.

### When NOT to Apply SOLID Strictly

- **Simple CRUD controllers**: Don't force a full Action/Service pattern for a 5-line store method.
- **Single-use classes**: Don't create an interface for a class that will only ever have one implementation.
- **Prototypes/MVPs**: Focus on shipping first — refactor when patterns emerge.
- **Configuration classes**: ServiceProviders, config files, and routes don't need SOLID scrutiny.
