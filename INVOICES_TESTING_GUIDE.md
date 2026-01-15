# Invoices Page - Testing Guide

## ✅ What's Ready

### Database Tables
- ✅ `invoices` - Created with all fields (id, customer_id, booking_id, work_order_id, amount, status, due_date, issued_date, paid_date, notes)
- ✅ `work_orders` - Enhanced with `status`, `total_amount`, `invoice_id` fields
- ✅ `customers` - Existing, used for customer lookup
- ✅ RLS policies - All tables have row-level security enabled

### Components Built
- ✅ **AddInvoiceModal** (`src/components/admin/AddInvoiceModal.tsx`)
  - Customer dropdown (fetches from `customers` table)
  - Line items with auto-calculated totals
  - Tax percentage input
  - Status dropdown (Draft, Sent, Paid, Partial, Overdue)
  - Due date picker (defaults to 30 days)
  - Notes textarea
  - Form validation with error handling

- ✅ **Invoices Page** (`src/pages/admin/Invoices.tsx`)
  - Full invoice listing with filters
  - Search by customer name or invoice ID
  - Filter by status and date range
  - Pagination (10 items per page)
  - Status dropdown for inline updates
  - Mark as Paid button
  - Delete button with confirmation
  - Responsive dark theme matching CRM design

- ✅ **AdminDashboard Integration** 
  - Invoices page linked to sidebar
  - "Weekly Revenue" and "Pending Payments" cards updated to fetch real data

## 🧪 Testing Steps

### Step 1: Add a Test Customer (if not already done)
1. Go to **Admin Dashboard** → **Customers**
2. Click **+ Add Customer**
3. Fill in required fields (Name, Phone, Lead Source)
4. Click **Save Customer**

### Step 2: Create Your First Invoice
1. Go to **Admin Dashboard** → **Invoices**
2. Click **+ New Invoice**
3. **Select Customer** from dropdown
4. **Add Line Items:**
   - Description: "Oil Change Service"
   - Quantity: 1
   - Unit Price: $75.00
   - (Auto-calculates subtotal: $75.00)
5. **Optional:** Set Tax to 6% (auto-calculates tax: $4.50)
6. **Total should show:** $79.50
7. Set **Due Date** (defaults to 30 days from now)
8. Set **Status** to "Draft" (or "Sent" if ready)
9. Click **Create Invoice**
10. You should see:
    - ✅ Success toast: "Invoice created successfully!"
    - ✅ Modal closes
    - ✅ New invoice appears in table

### Step 3: Verify Invoice in List
1. Check the invoice table shows:
   - Invoice ID (truncated to 8 chars)
   - Customer name
   - Amount ($79.50)
   - Status badge (Draft = gray)
   - Issued date (today)
   - Due date (30 days)

### Step 4: Test Filters
1. **Search:** Type customer name → table filters
2. **Status Filter:** Select "Draft" → only draft invoices show
3. **Date Range:** Select "Today" → only today's invoices show
4. Clear filters → all invoices show again

### Step 5: Update Invoice Status
1. Click on the **Status dropdown** for an invoice
2. Change from "Draft" → "Sent"
3. Toast shows "Invoice updated"
4. Badge color changes from gray to blue

### Step 6: Mark as Paid
1. Click the **✓ (Mark Paid)** button
2. Invoice status changes to "Paid"
3. Badge turns green
4. Toast shows "Invoice marked as paid"

### Step 7: Check Dashboard Overview
1. Go to **Overview** tab
2. Look at **"Pending Payments"** card
3. Should show $0 (no pending invoices - you marked the test one as paid)
4. **"Weekly Revenue"** card should show $79.50 (if the payment date logic is configured)

### Step 8: Delete Invoice (Optional)
1. Go back to **Invoices**
2. Click **🗑️ (Delete)** button on any invoice
3. Confirm deletion
4. Invoice disappears from list
5. Toast shows "Invoice deleted successfully"

## 📊 Expected Results

| Action | Expected Outcome |
|--------|------------------|
| Create invoice | Appears in list, counts in revenue totals |
| Change status | Badge color updates immediately |
| Mark as paid | Status → "Paid", green badge, removed from pending |
| Search customer | Table filters to matching invoices |
| Filter by status | Only invoices with that status show |
| Filter by date | Only invoices in that range show |
| Delete invoice | Removed from list, counts updated |
| Add multiple items | Subtotals calculate correctly, total updates |

## 🔧 Future Semi-Auto Workflow

**Current (Manual):**
- Create invoice manually via modal
- Select customer, add line items, set amount

**Semi-Auto (Ready for Phase 2):**
1. Create Work Order → mark as `status='completed'`
2. Go to **Invoices** → Click **+ New Invoice**
3. System could pre-populate from the completed work order:
   - Customer (from work_order.customer_id)
   - Total amount (from work_order.total_amount)
   - Service type (from work_order.service_type)
   - Link invoice back to work_order via `invoice_id` FK

**Full Auto (Phase 3):**
- Supabase Edge Function triggered on `work_order.status = 'completed'`
- Auto-creates draft invoice with work order details
- Notifies user to review & send

## ⚠️ Known Limitations (By Design)

1. **No PDF generation yet** - Invoice printing/PDF export not implemented
2. **No email sending** - "Mark as Sent" is manual status change only
3. **Recurring invoices** - Not supported yet
4. **Payment tracking** - Simple `paid_date` field, no payment methods recorded
5. **Estimates** - Invoices are for completed work only (no quotes/estimates module)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "No invoices" after creating one | Refresh page (F5) |
| Customer dropdown empty | Create a customer first in Customers page |
| Tax calculation wrong | Tax % must be 0-100, decimal OK (e.g., 6.5) |
| Modal won't open | Check browser console for errors |
| Can't delete invoice | Confirm the modal appears with "Are you sure?" |
| Pending Payments shows $0 | Invoices must have status="pending" or "partial" |

## 📝 Notes for Future Work

- **Invoicing number format:** Currently just UUID (could add `invoice_number` column with auto-increment format like "INV-001")
- **Payment methods:** Could extend to track payment type, check #, transaction ID, etc.
- **Line item persistence:** Currently line items are just used to calculate total (not stored separately - could add `invoice_items` junction table)
- **Discounts:** Could add discount percentage/amount to invoices
- **Custom invoice templates:** Could add different layouts/branding per invoice

---

**Ready to test? Go to Admin Dashboard → Invoices and create your first invoice! 🚀**
