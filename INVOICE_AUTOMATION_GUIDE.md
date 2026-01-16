# Invoice Automation Guide - Work Order to Invoice

## Overview

When a work order status is changed to **"completed"**, the system automatically:

1. ✅ Creates a draft invoice
2. ✅ Calculates the amount based on the service type pricing data
3. ✅ Links the invoice to the customer and work order
4. ✅ Sets due date to 30 days from today
5. ✅ Shows a confirmation toast notification

## How It Works

### Automatic Invoice Creation Flow

```
User marks work order as "completed"
    ↓
System fetches work order details (customer, service type)
    ↓
Service pricing utility calculates amount
    ↓
Invoice is created with auto-populated fields:
  - customer_id (from work order)
  - work_order_id (linked back to work order)
  - amount (from service pricing)
  - status: "draft" (for admin review)
  - issued_date: today
  - due_date: 30 days from today
    ↓
Toast shows: "Work order completed and invoice created"
    ↓
Admin can review invoice in Invoices page
```

### Service Pricing Data

The system uses the service catalog from `src/data/services.ts` to determine pricing:

- **Pricing Strategy**: Uses average of `minPrice` and `maxPrice` for each service
- **Fallback Prices**: If service type doesn't match exactly, uses predefined fallback amounts
- **Default**: $150 if no service match found (rare case)

**Examples:**
- Oil Change: min $60, max $120 → **$90**
- Front Brake Pads: min $120, max $190 → **$155**
- Full A/C Service: min $280, max $500 → **$390**
- OBD Diagnostic: min $95, max $145 → **$120**

## Testing the Feature

### Prerequisites

1. ✅ Admin dashboard accessible at `/admin`
2. ✅ At least one customer in the system
3. ✅ At least one work order in "pending" or "in_progress" status

### Step-by-Step Test

#### Step 1: Verify Existing Work Orders

1. Log in to Admin Dashboard
2. Navigate to **Overview** tab
3. Scroll to **Active Work Orders** section
4. Should see work orders with status "pending" or "in_progress"

#### Step 2: Mark Work Order as Completed

1. Find an active work order in the list
2. Click the **Status dropdown** for that work order
3. Change status from current status → **"Completed"**
4. Wait for confirmation

**Expected Result:**
- ✅ Green toast shows: "Work order completed and invoice created"
- ✅ Work order disappears from "Active Work Orders" list
- ✅ Invoice is created silently in background

#### Step 3: Verify Invoice Was Created

1. Navigate to **Invoices** page (in sidebar)
2. Check the invoices list
3. **New invoice should appear** with:
   - **Customer Name**: Same as work order customer
   - **Amount**: Calculated from service pricing (e.g., $90 for oil change)
   - **Status**: "Draft" (gray badge)
   - **Issued Date**: Today's date
   - **Due Date**: 30 days from today
   - **Notes**: "Auto-generated from work order for [Service Name]"

#### Step 4: Verify Invoice Details

1. Click on the new invoice in the list
2. If detail view exists, check:
   - Work order reference
   - Customer information matches
   - Service type in notes field
3. Return to list and verify invoice is linked

#### Step 5: Modify Invoice Status (Optional)

1. In Invoices list, change invoice status:
   - Draft → **Sent** (blue badge)
   - Sent → **Paid** (green badge)
2. Observe status updates immediately

#### Step 6: Test with Multiple Services

Repeat steps 1-5 with different service types to verify pricing calculation:

| Service Type | Expected Price Range |
|---|---|
| Oil Change | ~$90 |
| Brake Work | ~$255 |
| A/C Service | ~$390 |
| Diagnostics | ~$120 |
| Suspension | ~$235 |

### Testing with Completed Work Orders Filter

1. Go back to **Overview** tab
2. Look at **Active Work Orders** section
3. Verify completed work orders **no longer appear**
4. Only pending/in_progress orders show

## Troubleshooting

### Issue: Invoice Not Created

**Symptoms:**
- Work order marked as completed ✅
- But no invoice appears in Invoices page ❌
- Toast shows "Work order completed" but no mention of invoice

**Solutions:**
1. **Refresh the page** - Sometimes UI doesn't update immediately
   - Press F5 to refresh
   - Wait 2-3 seconds and check Invoices page again

2. **Check customer exists** - Invoice creation requires valid customer
   - Go to Customers page
   - Verify the customer from the work order exists and is active
   - If missing, the invoice might fail silently

3. **Check browser console** - Look for JavaScript errors
   - Right-click → Inspect → Console tab
   - Look for red error messages
   - Share any errors in support

4. **Manual fallback** - If automation fails:
   - Go to Invoices → Click "New Invoice"
   - Manually create invoice with same details
   - (Automation issue will be fixed, but customer shouldn't wait)

### Issue: Wrong Amount Calculated

**Symptoms:**
- Invoice created ✅
- But amount is incorrect ❌

**Possible Causes:**
1. **Service type mismatch** - Work order service_type doesn't match catalog
   - Check work order service_type value
   - Go to `src/data/services.ts` and verify service exists
   - If not, may hit fallback price ($150)

2. **Pricing data outdated** - Service prices changed
   - Edit service in `src/data/services.ts`
   - Restart dev server if needed
   - Reprice the invoice manually if needed for current work orders

**Solution:**
- Review calculated amount
- If wrong, edit in Invoices page
- Click Status dropdown → Change to correct amount
- (Invoice editing not yet implemented, use workaround: delete and recreate)

## Implementation Details

### Files Modified

1. **src/utils/service-pricing.ts** (NEW)
   - `getServicePrice()` - Calculate price from service type
   - `getServiceDescription()` - Get human-readable service name

2. **src/pages/admin/AdminDashboard.tsx**
   - Import service pricing utilities
   - Update `updateWorkOrderStatus()` function
   - Trigger invoice creation when status = "completed"

### Database Operations

When work order is completed:

```sql
-- 1. Fetch work order details
SELECT id, customer_id, service_type 
FROM work_orders 
WHERE id = [id]

-- 2. Create invoice
INSERT INTO invoices (
  customer_id, 
  work_order_id, 
  amount, 
  status, 
  issued_date, 
  due_date, 
  notes
) VALUES (
  [customer_id],
  [work_order_id],
  [calculated_amount],
  'draft',
  [today],
  [today + 30 days],
  'Auto-generated from work order for [service]'
)

-- 3. Update work order status
UPDATE work_orders 
SET status = 'completed' 
WHERE id = [id]
```

## Future Enhancements

### Phase 2: Invoice Details
- [ ] Store line items separately in `invoice_items` table
- [ ] Show invoice details (not just amount)
- [ ] Add parts/labor line items from work order
- [ ] Calculate tax based on work type

### Phase 3: Enhanced Automation
- [ ] Option to auto-send invoice via email
- [ ] Auto-update status based on payment received
- [ ] Recurring invoices for maintenance plans
- [ ] Invoice number sequencing (INV-001, INV-002)

### Phase 4: Notifications
- [ ] Email notification when invoice created
- [ ] Slack/Teams notification to accounting
- [ ] Payment reminder emails (overdue invoices)
- [ ] Customer portal to view invoices

## Support

If invoice automation isn't working:

1. ✅ Check this guide's troubleshooting section
2. 📋 Check browser console for errors (F12 → Console)
3. 🔄 Try refreshing the page (F5)
4. 📞 Contact support if issue persists

---

**Quick Summary:**
- ✅ Mark work order "Completed" → Invoice auto-created
- ✅ Invoice linked to customer and work order
- ✅ Amount calculated from service pricing
- ✅ Status set to "Draft" for admin review
- ✅ Due date automatically set to 30 days
