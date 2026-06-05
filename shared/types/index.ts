export interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

export interface HealthCheck {
  status: 'ok' | 'error'
  timestamp: string
  uptime: number
  version: string
}

// ── Core Domain Models ──

export interface Card {
  id: number
  balance: number
  number: string
  holder: string
  expiry: string
  theme: 'dark' | 'light' | 'blue'
  cardType?: string
}

export interface TransactionRaw {
  id: number
  type: string
  title: string
  date: string
  amount: number
  tone: 'yellow' | 'blue' | 'teal'
}

export interface Transaction {
  id: number
  name: string
  amount: number
  date: string
  type: 'income' | 'expense'
  iconColor: 'yellow' | 'blue' | 'cyan'
  icon: string
}

export interface ContactRaw {
  id: number
  name: string
  role: string
  avatar: string
}

export interface Contact extends ContactRaw {
  selected?: boolean
}

export interface ExpenseBar {
  month: string
  percentage: number
  active: boolean
  valueLabel?: string
}

// ── Accounts Page Types ──

export type SummaryTone = 'balance' | 'income' | 'expense' | 'saving'
export type TransactionTone = 'cyan' | 'blue' | 'pink'
export type TransactionType = 'income' | 'expense'
export type SummaryIcon = SummaryTone
export type TransactionIcon = 'subscription' | 'service' | 'user'
export type InvoiceTone = 'cyan' | 'yellow' | 'blue' | 'pink'
export type InvoiceIcon = 'apple' | 'user' | 'playstation'

export interface SummaryMetric {
  id: SummaryTone
  label: string
  value: string
  icon: SummaryIcon
  tone: SummaryTone
}

export interface AccountTransaction {
  id: number
  title: string
  date: string
  category: string
  card: string
  status: string
  amount: number
  type: TransactionType
  tone: TransactionTone
  icon: TransactionIcon
}

export interface ChartDay {
  day: string
  debit: number
  credit: number
}

export interface Invoice {
  id: number
  name: string
  time: string
  amount: number
  tone: InvoiceTone
  icon: InvoiceIcon
}

// ── Loans Page Types ──

export interface LoanType {
  id: string
  label: string
  value: string
  icon: string
  tone: string
}

export interface ActiveLoanRaw {
  id: number
  name: string
  amount: number
  leftToPay: number
  duration: string
  interestRate: number
  repayAmount: number
  status: string
}

export interface ActiveLoan {
  id: number
  slNo: string
  loanMoney: string
  leftToRepay: string
  duration: string
  interestRate: string
  installment: string
  highlighted?: boolean
}

// ── Services Page Types ──

export interface FeaturedService {
  id: number
  title: string
  subtitle: string
  iconBg: string
  icon: string
}

export interface BankService {
  id: number
  name: string
  description: string
  iconBg: string
  icon: string
}

// ── Investments Page Types ──

export interface SummaryStatRaw {
  id: string
  label: string
  value: string
  icon: string
  tone: string
}

export interface InvestmentRaw {
  id: number
  name: string
  category: string
  amount: number
  returnRate: number
  returnType: 'up' | 'down'
  icon: string
  tone: string
}

export interface StockRaw {
  id: number
  name: string
  ticker: string
  price: number
  returnRate: number
  returnType: 'up' | 'down'
}

export interface SummaryStat {
  id: number
  label: string
  value: string
  iconBg: string
  icon: string
}

export interface Investment {
  id: number
  name: string
  category: string
  amount: string
  returnValue: string
  returnPositive: boolean
  iconBg: string
  icon: string
}

export interface Stock {
  id: number
  slNo: string
  name: string
  price: string
  returnValue: string
  returnPositive: boolean
}

// ── Credit Cards Page Types ──

export interface CreditCard {
  id: number
  balance: number
  number: string
  holder: string
  expiry: string
  theme: 'dark' | 'dark2' | 'light'
  cardType: string
}

export interface CardListItem {
  id: number
  cardType: string
  bank: string
  number: string
  nameOnCard: string
  iconBg: string
  iconColor: string
}

export interface CardSetting {
  id: number
  title: string
  subtitle: string
  iconBg: string
  icon: string
}

// ── Privileges Page Types ──

export interface PrivilegeRaw {
  id: number
  title: string
  description: string
  iconBg: string
  icon: string
}

export interface Privilege {
  id: number
  title: string
  description: string
  iconBg: string
  icon: string
  status: 'active' | 'locked' | 'new'
  statusLabel: string
}

export interface PointStatRaw {
  month: string
  points: number
}

// ── Settings Page Types ──

export interface UserProfile {
  name: string
  username: string
  email: string
  password?: string
  dob: string
  presentAddress: string
  permanentAddress: string
  city: string
  postal: string
  country: string
}

export interface UserPreferences {
  twoFactor: boolean
  newsletter: boolean
  pushNotif: boolean
  smsNotif: boolean
}

// ── Transactions Page Types ──

export interface PageTransaction {
  id: string
  description: string
  transactionId: string
  type: string
  card: string
  date: string
  amount: number
  isIncome: boolean
}
