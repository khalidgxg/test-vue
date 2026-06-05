<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or internally by Laravel's
| route registration system.
|
*/

// GET /api/dashboard
Route::get('/dashboard', function () {
    return response()->json([
        'cards' => [
            [
                'id' => 1,
                'balance' => 600,
                'number' => '3778 **** **** 1234',
                'holder' => 'Eddy Cusuma',
                'expiry' => '12/22',
                'theme' => 'dark',
            ],
            [
                'id' => 2,
                'balance' => 5756,
                'number' => '3778 **** **** 1234',
                'holder' => 'Eddy Cusuma',
                'expiry' => '12/22',
                'theme' => 'light',
            ]
        ],
        'recent_transactions' => [
            [
                'id' => 1,
                'type' => 'card',
                'title' => 'Deposit from my Card',
                'date' => '28 January 2021',
                'amount' => -850,
                'tone' => 'yellow',
            ],
            [
                'id' => 2,
                'type' => 'paypal',
                'title' => 'Deposit Paypal',
                'date' => '25 January 2021',
                'amount' => 2500,
                'tone' => 'blue',
            ],
            [
                'id' => 3,
                'type' => 'user',
                'title' => 'Jemi Wilson',
                'date' => '21 January 2021',
                'amount' => 5400,
                'tone' => 'teal',
            ]
        ],
        'weekly_activity' => [
            ['day' => 'Sat', 'withdraw' => 480, 'deposit' => 240],
            ['day' => 'Sun', 'withdraw' => 350, 'deposit' => 120],
            ['day' => 'Mon', 'withdraw' => 320, 'deposit' => 280],
            ['day' => 'Tue', 'withdraw' => 480, 'deposit' => 380],
            ['day' => 'Wed', 'withdraw' => 150, 'deposit' => 440],
            ['day' => 'Thu', 'withdraw' => 390, 'deposit' => 250],
            ['day' => 'Fri', 'withdraw' => 400, 'deposit' => 340],
        ],
        'expense_statistics' => [
            ['label' => 'Entertainment', 'percentage' => 30, 'color' => '#1814F3'],
            ['label' => 'Bill Expense', 'percentage' => 15, 'color' => '#FC7900'],
            ['label' => 'Investment', 'percentage' => 20, 'color' => '#FA3987'],
            ['label' => 'Others', 'percentage' => 35, 'color' => '#11E0D1'],
        ],
        'quick_transfer' => [
            ['id' => 1, 'name' => 'Livia Bator', 'role' => 'CEO', 'avatar' => 'https://i.pravatar.cc/80?img=1'],
            ['id' => 2, 'name' => 'Randy Press', 'role' => 'Director', 'avatar' => 'https://i.pravatar.cc/80?img=2'],
            ['id' => 3, 'name' => 'Workman', 'role' => 'Designer', 'avatar' => 'https://i.pravatar.cc/80?img=3'],
            ['id' => 4, 'name' => 'Sofia', 'role' => 'Developer', 'avatar' => 'https://i.pravatar.cc/80?img=4'],
            ['id' => 5, 'name' => 'Alex', 'role' => 'Manager', 'avatar' => 'https://i.pravatar.cc/80?img=5'],
        ],
        'balance_history' => [
            ['month' => 'Jul', 'balance' => 120],
            ['month' => 'Aug', 'balance' => 280],
            ['month' => 'Sep', 'balance' => 210],
            ['month' => 'Oct', 'balance' => 480],
            ['month' => 'Nov', 'balance' => 390],
            ['month' => 'Dec', 'balance' => 580],
            ['month' => 'Jan', 'balance' => 650],
        ]
    ]);
});

// GET /api/transactions
Route::get('/transactions', function () {
    return response()->json([
        'transactions' => [
            [
                'id' => '1',
                'description' => 'Spotify Subscription',
                'transactionId' => '#12548796',
                'type' => 'Shopping',
                'card' => '1234 ****',
                'date' => '28 Jan, 12.30 AM',
                'amount' => 2500,
                'isIncome' => false,
            ],
            [
                'id' => '2',
                'description' => 'Freepik Sales',
                'transactionId' => '#12548796',
                'type' => 'Transfer',
                'card' => '1234 ****',
                'date' => '25 Jan, 10.40 PM',
                'amount' => 750,
                'isIncome' => true,
            ],
            [
                'id' => '3',
                'description' => 'Mobile Service',
                'transactionId' => '#12548796',
                'type' => 'Service',
                'card' => '1234 ****',
                'date' => '20 Jan, 10.40 PM',
                'amount' => 150,
                'isIncome' => false,
            ],
            [
                'id' => '4',
                'description' => 'Wilson',
                'transactionId' => '#12548796',
                'type' => 'Transfer',
                'card' => '1234 ****',
                'date' => '15 Jan, 03.29 PM',
                'amount' => 1050,
                'isIncome' => false,
            ],
            [
                'id' => '5',
                'description' => 'Emilly',
                'transactionId' => '#12548796',
                'type' => 'Transfer',
                'card' => '1234 ****',
                'date' => '14 Jan, 10.40 PM',
                'amount' => 840,
                'isIncome' => true,
            ]
        ],
        'my_expense' => [
            ['month' => 'Aug', 'percentage' => 65, 'active' => false],
            ['month' => 'Sep', 'percentage' => 85, 'active' => false],
            ['month' => 'Oct', 'percentage' => 68, 'active' => false],
            ['month' => 'Nov', 'percentage' => 45, 'active' => false],
            ['month' => 'Dec', 'percentage' => 80, 'active' => true, 'valueLabel' => '$12,500'],
            ['month' => 'Jan', 'percentage' => 72, 'active' => false],
        ]
    ]);
});

// GET /api/accounts
Route::get('/accounts', function () {
    return response()->json([
        'summary_metrics' => [
            ['id' => 'balance', 'label' => 'My Balance', 'value' => '$12,750', 'icon' => 'balance', 'tone' => 'balance'],
            ['id' => 'income', 'label' => 'Income', 'value' => '$5,600', 'icon' => 'income', 'tone' => 'income'],
            ['id' => 'expense', 'label' => 'Expense', 'value' => '$3,460', 'icon' => 'expense', 'tone' => 'expense'],
            ['id' => 'saving', 'label' => 'Total Saving', 'value' => '$7,920', 'icon' => 'saving', 'tone' => 'saving'],
        ],
        'transactions' => [
            [
                'id' => 1,
                'title' => 'Spotify Subscription',
                'date' => '25 Jan 2021',
                'category' => 'Shopping',
                'card' => '1234 ****',
                'status' => 'Pending',
                'amount' => 150,
                'type' => 'expense',
                'tone' => 'cyan',
                'icon' => 'subscription',
            ],
            [
                'id' => 2,
                'title' => 'Mobile Service',
                'date' => '25 Jan 2021',
                'category' => 'Service',
                'card' => '1234 ****',
                'status' => 'Completed',
                'amount' => 340,
                'type' => 'expense',
                'tone' => 'blue',
                'icon' => 'service',
            ],
            [
                'id' => 3,
                'title' => 'Emilly Wilson',
                'date' => '25 Jan 2021',
                'category' => 'Transfer',
                'card' => '1234 ****',
                'status' => 'Completed',
                'amount' => 780,
                'type' => 'income',
                'tone' => 'pink',
                'icon' => 'user',
            ],
        ],
        'chart_days' => [
            ['day' => 'Sat', 'debit' => 42, 'credit' => 83],
            ['day' => 'Sun', 'debit' => 30, 'credit' => 66],
            ['day' => 'Mon', 'debit' => 28, 'credit' => 44],
            ['day' => 'Tue', 'debit' => 75, 'credit' => 38],
            ['day' => 'Wed', 'debit' => 47, 'credit' => 76],
            ['day' => 'Thu', 'debit' => 50, 'credit' => 30],
            ['day' => 'Fri', 'debit' => 64, 'credit' => 77],
        ],
        'invoices' => [
            ['id' => 1, 'name' => 'Apple Store', 'time' => '5h ago', 'amount' => 450, 'tone' => 'cyan', 'icon' => 'apple'],
            ['id' => 2, 'name' => 'Michael', 'time' => '2 days ago', 'amount' => 160, 'tone' => 'yellow', 'icon' => 'user'],
            ['id' => 3, 'name' => 'Playstation', 'time' => '5 days ago', 'amount' => 1085, 'tone' => 'blue', 'icon' => 'playstation'],
            ['id' => 4, 'name' => 'William', 'time' => '10 days ago', 'amount' => 90, 'tone' => 'pink', 'icon' => 'user'],
        ],
        'card' => [
            'balance' => 5756,
            'holder' => 'Eddy Cusuma',
            'expiry' => '12/22',
            'number' => '3778 **** **** 1234',
        ]
    ]);
});

// GET /api/investments
Route::get('/investments', function () {
    return response()->json([
        'summary_stats' => [
            ['id' => 'total_invested', 'label' => 'Total Invested Amount', 'value' => '$150,000', 'icon' => 'invested', 'tone' => 'cyan'],
            ['id' => 'number_investments', 'label' => 'Number of Investments', 'value' => '1,250', 'icon' => 'number', 'tone' => 'yellow'],
            ['id' => 'rate_return', 'label' => 'Rate of Return', 'value' => '+5.80%', 'icon' => 'rate', 'tone' => 'pink'],
        ],
        'yearly_data' => [
            ['year' => 2016, 'value' => 15000],
            ['year' => 2017, 'value' => 28000],
            ['year' => 2018, 'value' => 18000],
            ['year' => 2019, 'value' => 35000],
            ['year' => 2020, 'value' => 25000],
            ['year' => 2021, 'value' => 38000],
        ],
        'monthly_data' => [
            ['month' => 'Jan', 'value' => 18000],
            ['month' => 'Feb', 'value' => 22000],
            ['month' => 'Mar', 'value' => 15000],
            ['month' => 'Apr', 'value' => 32000],
            ['month' => 'May', 'value' => 28000],
            ['month' => 'Jun', 'value' => 34000],
        ],
        'my_investments' => [
            ['id' => 1, 'name' => 'Apple Store', 'category' => 'E-Commerce, Marketplace', 'amount' => 54000, 'returnRate' => 16, 'returnType' => 'up', 'icon' => 'apple', 'tone' => 'cyan'],
            ['id' => 2, 'name' => 'Google Store', 'category' => 'Tech, Mobile', 'amount' => 25000, 'returnRate' => -4, 'returnType' => 'down', 'icon' => 'google', 'tone' => 'yellow'],
            ['id' => 3, 'name' => 'Tesla Motors', 'category' => 'Automotive, Electric', 'amount' => 35000, 'returnRate' => 25, 'returnType' => 'up', 'icon' => 'tesla', 'tone' => 'blue'],
        ],
        'trending_stocks' => [
            ['id' => 1, 'name' => 'Trivago', 'ticker' => 'TRV', 'price' => 125.5, 'returnRate' => 2.5, 'returnType' => 'up'],
            ['id' => 2, 'name' => 'Apple', 'ticker' => 'AAPL', 'price' => 172.3, 'returnRate' => 1.8, 'returnType' => 'up'],
            ['id' => 3, 'name' => 'Nvidia', 'ticker' => 'NVDA', 'price' => 875.2, 'returnRate' => -1.2, 'returnType' => 'down'],
        ]
    ]);
});

// GET /api/loans
Route::get('/loans', function () {
    return response()->json([
        'loan_types' => [
            ['id' => 'personal', 'label' => 'Personal Loans', 'value' => '$50,000', 'icon' => 'personal', 'tone' => 'blue'],
            ['id' => 'corporate', 'label' => 'Corporate Loans', 'value' => '$100,000', 'icon' => 'corporate', 'tone' => 'yellow'],
            ['id' => 'business', 'label' => 'Business Loans', 'value' => '$150,000', 'icon' => 'business', 'tone' => 'pink'],
            ['id' => 'equity', 'label' => 'Equity Loans', 'value' => '$200,000', 'icon' => 'equity', 'tone' => 'cyan'],
        ],
        'active_loans' => [
            ['id' => 1, 'name' => 'Personal Loan', 'amount' => 50000, 'leftToPay' => 40500, 'duration' => '36 Months', 'interestRate' => 8, 'repayAmount' => 1500, 'status' => 'Active'],
            ['id' => 2, 'name' => 'Corporate Loan', 'amount' => 100000, 'leftToPay' => 80000, 'duration' => '60 Months', 'interestRate' => 10, 'repayAmount' => 2500, 'status' => 'Active'],
            ['id' => 3, 'name' => 'Business Loan', 'amount' => 150000, 'leftToPay' => 120000, 'duration' => '48 Months', 'interestRate' => 12, 'repayAmount' => 4000, 'status' => 'Active'],
        ]
    ]);
});

// GET /api/credit-cards
Route::get('/credit-cards', function () {
    return response()->json([
        'my_cards' => [
            [
                'id' => 1,
                'balance' => 5756,
                'number' => '3778 **** **** 1234',
                'holder' => 'Eddy Cusuma',
                'expiry' => '12/22',
                'theme' => 'dark',
                'cardType' => 'Visa',
            ],
            [
                'id' => 2,
                'balance' => 3520,
                'number' => '4512 **** **** 5678',
                'holder' => 'Eddy Cusuma',
                'expiry' => '08/25',
                'theme' => 'blue',
                'cardType' => 'Mastercard',
            ],
            [
                'id' => 3,
                'balance' => 1840,
                'number' => '5243 **** **** 9012',
                'holder' => 'Eddy Cusuma',
                'expiry' => '04/26',
                'theme' => 'light',
                'cardType' => 'Visa',
            ]
        ],
        'donut_data' => [
            ['label' => 'Shopping', 'value' => 35, 'color' => '#1814F3'],
            ['label' => 'Bill Expense', 'value' => 25, 'color' => '#FFBB38'],
            ['label' => 'Entertainment', 'value' => 20, 'color' => '#FF4B4A'],
            ['label' => 'Others', 'value' => 20, 'color' => '#16DBCC'],
        ]
    ]);
});

// GET /api/services
Route::get('/services', function () {
    return response()->json([
        'featured_services' => [
            [
                'id' => 1,
                'title' => 'Life Insurance',
                'subtitle' => 'Unlimited protection',
                'iconBg' => '#E7EDFF',
                'icon' => '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 4C10 4 6 8 6 13C6 19 15 27 15 27C15 27 24 19 24 13C24 8 20 4 15 4Z" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 10V16M12 13H18" stroke="#396AFF" stroke-width="1.8" stroke-linecap="round"/></svg>',
            ],
            [
                'id' => 2,
                'title' => 'Shopping',
                'subtitle' => 'Buy. Think. Grow.',
                'iconBg' => '#FFF5D9',
                'icon' => '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M6 7H8L10 19H22L24 11H10" stroke="#FFBB38" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="22" r="1.5" fill="#FFBB38"/><circle cx="20" cy="22" r="1.5" fill="#FFBB38"/></svg>',
            ],
            [
                'id' => 3,
                'title' => 'Safety',
                'subtitle' => 'We are your allies',
                'iconBg' => '#DCFAF8',
                'icon' => '<svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 4L6 8V15C6 20 10 24.5 15 26C20 24.5 24 20 24 15V8L15 4Z" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 15L13.5 17.5L19 12" stroke="#16DBCC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            ]
        ],
        'bank_services' => [
            [
                'id' => 1,
                'name' => 'Business loans',
                'description' => 'It is a long established',
                'iconBg' => '#FFE0EB',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#FF4B4A" stroke-width="1.5"/><path d="M4 19C4 16 7 14 11 14C15 14 18 16 18 19" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round"/></svg>',
            ],
            [
                'id' => 2,
                'name' => 'Checking accounts',
                'description' => 'It is a long established',
                'iconBg' => '#FFF5D9',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="#FFBB38" stroke-width="1.5"/><path d="M3 9H19" stroke="#FFBB38" stroke-width="1.5"/><path d="M7 13H10" stroke="#FFBB38" stroke-width="1.5" stroke-linecap="round"/></svg>',
            ],
            [
                'id' => 3,
                'name' => 'Savings accounts',
                'description' => 'It is a long established',
                'iconBg' => '#FFE0EB',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 18V8L11 4L18 8V18H4Z" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="13" width="6" height="5" stroke="#FF4B4A" stroke-width="1.5"/></svg>',
            ],
            [
                'id' => 4,
                'name' => 'Debit and credit cards',
                'description' => 'It is a long established',
                'iconBg' => '#E7EDFF',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="7" stroke="#396AFF" stroke-width="1.5"/><path d="M11 8V14M8 11H14" stroke="#396AFF" stroke-width="1.5" stroke-linecap="round"/></svg>',
            ],
            [
                'id' => 5,
                'name' => 'Life Insurance',
                'description' => 'It is a long established',
                'iconBg' => '#DCFAF8',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C7 3 4 6 4 10C4 14 11 20 11 20C11 20 18 14 18 10C18 6 15 3 11 3Z" stroke="#16DBCC" stroke-width="1.5" stroke-linecap="round"/><path d="M11 7V13M8 10H14" stroke="#16DBCC" stroke-width="1.5" stroke-linecap="round"/></svg>',
            ],
            [
                'id' => 6,
                'name' => 'Business loans',
                'description' => 'It is a long established',
                'iconBg' => '#FFE0EB',
                'icon' => '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#FF4B4A" stroke-width="1.5"/><path d="M4 19C4 16 7 14 11 14C15 14 18 16 18 19" stroke="#FF4B4A" stroke-width="1.5" stroke-linecap="round"/></svg>',
            ]
        ]
    ]);
});

// GET /api/my-privileges
Route::get('/my-privileges', function () {
    return response()->json([
        'privileges' => [
            [
                'id' => 1,
                'title' => 'Free Lounge Access',
                'description' => 'Enjoy free airport lounge access worldwide',
                'iconBg' => '#E7EDFF',
                'icon' => 'lounge',
            ],
            [
                'id' => 2,
                'title' => 'Cashback Rewards',
                'description' => 'Earn 2% cashback on all dining and travel expenses',
                'iconBg' => '#FFF5D9',
                'icon' => 'cashback',
            ],
            [
                'id' => 3,
                'title' => 'Concierge Service',
                'description' => '24/7 personal assistant for bookings and requests',
                'iconBg' => '#DCFAF8',
                'icon' => 'concierge',
            ]
        ],
        'point_stats' => [
            ['month' => 'Jan', 'points' => 1200],
            ['month' => 'Feb', 'points' => 1800],
            ['month' => 'Mar', 'points' => 2400],
            ['month' => 'Apr', 'points' => 3100]
        ]
    ]);
});

// GET /api/settings
Route::get('/settings', function () {
    return response()->json([
        'profile' => [
            'name' => 'Charlene Reed',
            'username' => 'Charlene Reed',
            'email' => 'charlenereed@gmail.com',
            'password' => '',
            'dob' => '25 January 1990',
            'presentAddress' => 'San Jose, California, USA',
            'permanentAddress' => 'San Jose, California, USA',
            'city' => 'San Jose',
            'postal' => '45962',
            'country' => 'USA',
        ],
        'preferences' => [
            'twoFactor' => true,
            'newsletter' => false,
            'pushNotif' => true,
            'smsNotif' => false,
        ]
    ]);
});

// POST /api/settings
// POST /api/auth/login
Route::post('/auth/login', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|max:255',
        'password' => 'required|string|min:8',
    ]);

    // Demo authentication (replace with real auth in production)
    if ($validated['email'] === 'admin@admin.com' && $validated['password'] === 'password') {
        return response()->json([
            'user' => [
                'id' => 1,
                'name' => 'Admin User',
                'email' => $validated['email'],
                'user_type' => 'admin',
                'avatar' => 'https://i.pravatar.cc/80?img=47',
            ],
            'token' => 'demo-jwt-token-' . bin2hex(random_bytes(16)),
        ]);
    }

    return response()->json([
        'message' => 'Invalid credentials',
    ], 401);
});

// GET /api/auth/me
Route::get('/auth/me', function (Request $request) {
    $token = $request->bearerToken();
    if (!$token) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }
    return response()->json([
        'id' => 1,
        'name' => 'Admin User',
        'email' => 'admin@admin.com',
        'user_type' => 'admin',
        'avatar' => 'https://i.pravatar.cc/80?img=47',
    ]);
});

// POST /api/auth/logout
Route::post('/auth/logout', function () {
    return response()->json(['success' => true]);
});

Route::post('/settings', function (Request $request) {
    // Validate request strictly according to secure coding rules
    $validated = $request->validate([
        'profile.name' => 'required|string|max:255',
        'profile.username' => 'required|string|max:255',
        'profile.email' => 'required|email|max:255',
        'profile.dob' => 'nullable|string|max:255',
        'profile.presentAddress' => 'nullable|string|max:255',
        'profile.permanentAddress' => 'nullable|string|max:255',
        'profile.city' => 'nullable|string|max:255',
        'profile.postal' => 'nullable|string|max:255',
        'profile.country' => 'nullable|string|max:255',
        'preferences.twoFactor' => 'boolean',
        'preferences.newsletter' => 'boolean',
        'preferences.pushNotif' => 'boolean',
        'preferences.smsNotif' => 'boolean',
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Profile settings updated successfully!',
        'data' => $validated
    ]);
});
