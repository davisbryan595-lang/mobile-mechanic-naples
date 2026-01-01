export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "brake-tips",
    title: "5 Signs Your Brakes Need Replacement",
    excerpt: "Learn to recognize the warning signs of brake wear before they become a safety hazard. Early detection can save you money and keep you safe.",
    author: "Mike Johnson",
    date: "2024-01-15",
    category: "Brakes",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F34b72e1131b14151a5a8b342b0c36c6b?format=webp&width=800",
    readTime: 6,
    content: `# Common Brake Problems and How to Fix Them

Brakes are one of the most critical safety systems in your vehicle. Understanding common brake problems can help you catch issues early and maintain your vehicle's safety.

## Understanding Your Brake System

Your vehicle's braking system consists of several components working together:

- **Brake pads**: Friction material that grips the rotor
- **Rotors**: Spinning discs that brake pads clamp down on
- **Calipers**: Hydraulic devices that squeeze pads against rotors
- **Brake fluid**: Transmits pressure throughout the system
- **Master cylinder**: Controls brake pressure distribution

## 5 Warning Signs You Need Brake Service

### 1. Squealing or Squeaking Sounds
Most brake pads have built-in wear indicators that emit a high-pitched squeal when pads are thin. If you hear this sound, it's time for a replacement.

**What to do:** Schedule service immediately. Continued driving with thin pads can damage rotors, leading to more expensive repairs.

### 2. Grinding Noises
A grinding sound indicates brake pads have worn completely through to the metal backing. This is dangerous and damages rotors.

**What to do:** Stop driving and get service urgently. Driving with grinding brakes risks total brake failure.

### 3. Soft or Spongy Brake Pedal
If your brake pedal goes down too far before stopping the car, you may have air in the brake lines or low brake fluid.

**What to do:** Check brake fluid level. If low, top it off. If the problem persists, you likely need brake bleeding service.

### 4. Vibration or Pulsation When Braking
A pulsating brake pedal usually indicates warped rotors that need resurfacing or replacement.

**What to do:** Have rotors inspected and resurfaced or replaced to restore smooth braking.

### 5. Brake Fluid Leaks
Dark fluid under your vehicle near the wheels suggests brake fluid leaks, compromising braking power.

**What to do:** Get service immediately. Brake fluid leaks are safety issues that require urgent attention.

## Brake Maintenance Tips

**Regular Inspections:** Have brakes inspected every 6 months or 6,000 miles.

**Gentle Braking:** Avoid harsh braking when possible to extend pad life.

**Quality Parts:** Always use quality replacement parts for optimal safety.

**Professional Service:** Trust certified mechanics for brake work—it's too important for DIY unless you're experienced.

## When to Schedule Service

Common brake service intervals:
- **Brake pads**: 25,000-70,000 miles depending on driving habits
- **Rotors**: Often with pads if worn or damaged
- **Brake fluid flush**: Every 2-3 years
- **Brake inspection**: Annually or every 6 months

## The Cost of Neglecting Brakes

Ignoring brake warning signs leads to:
- Rotor damage (more expensive replacement)
- Brake system component failure
- Reduced vehicle safety
- Potential accidents

**Bottom line:** Brake maintenance is an investment in safety. Catching problems early saves money and protects your family.

---

Our mobile mechanics are equipped to handle all brake service needs right at your location. No waiting, no hassle—professional brake service comes to you.`,
  },
  {
    id: "2",
    slug: "oil-change-guide",
    title: "Complete Oil Change Guide: Intervals and Benefits",
    excerpt: "Understanding proper oil change intervals keeps your engine running smoothly and extends its lifespan significantly.",
    author: "Sarah Mitchell",
    date: "2024-01-12",
    category: "Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fed5399a1ba734975b185d6fc2efdcd53?format=webp&width=800",
    readTime: 7,
    content: `# Complete Oil Change Guide: Intervals and Benefits

Regular oil changes are the foundation of vehicle maintenance. Oil keeps your engine running smoothly, reduces wear, and prevents costly damage.

## Why Oil Changes Matter

Engine oil serves multiple critical functions:

- **Lubrication**: Reduces friction between moving parts
- **Cooling**: Carries heat away from engine components
- **Cleaning**: Removes sludge and contaminants
- **Sealing**: Maintains compression in engine cylinders
- **Protection**: Prevents rust and corrosion

Over time, oil breaks down, loses effectiveness, and accumulates contaminants, reducing its ability to protect your engine.

## Oil Change Intervals: Traditional vs. Synthetic

**Conventional Oil:**
- Change every 3,000-5,000 miles
- Every 3-6 months
- More frequent maintenance required
- Lower initial cost

**Synthetic Oil:**
- Change every 7,500-10,000 miles
- Every 6-12 months
- Longer intervals save time
- Better performance in extreme temperatures
- Higher initial cost but fewer changes needed

**Check Your Owner's Manual:** Modern vehicles often have specific requirements. Don't exceed recommended intervals.

## Signs You Need an Oil Change

- Check engine light (oil pressure warning)
- Dark, dirty oil on dipstick
- Engine knocking or ticking
- Vehicle has reached mileage interval
- More than 6 months since last change

## What Happens During an Oil Change

A complete oil change includes:

1. **Oil drain**: Remove old, dirty oil completely
2. **Filter replacement**: Install new oil filter
3. **Top-up**: Fill with correct type and amount of fresh oil
4. **System check**: Inspect related components
5. **Reset**: Clear service reminder light

## Types of Motor Oil

**0W-20, 0W-30, 5W-30:** Common for most vehicles
- First number: Cold weather flow
- Second number: Hot weather thickness

Choose the grade specified in your owner's manual for optimal performance.

## Oil Change Benefits

**Proper Intervals Provide:**
- Better engine performance
- Improved fuel economy
- Extended engine life (potentially 200,000+ miles)
- Lower emission levels
- Reduced risk of engine failure
- Cheaper than engine replacement ($5,000-$10,000+)

## DIY vs. Professional Service

**Professional Advantages:**
- Proper disposal of old oil
- System inspection and diagnostics
- Filter change with proper torque specifications
- Convenience (mobile service available)
- Warranty on work performed

## Oil Change Cost

- **Conventional**: $25-$75
- **Synthetic**: $65-$125
- Varies by vehicle and location

Regular maintenance costs far less than engine replacement.

## Pro Tips

- **Mark your calendar** when you get service done
- **Keep records** of all maintenance
- **Check oil level** monthly between changes
- **Don't overfill** oil—check dipstick when engine is cold and on level ground
- **Top-up between services** if needed with matching oil type

---

Our mobile mechanics bring professional oil change service to your driveway. We use quality oils and filters, properly dispose of old oil, and document everything in your service history.`,
  },
  {
    id: "3",
    slug: "battery-issues",
    title: "Car Battery Dead? Troubleshooting Common Battery Issues",
    excerpt: "Dead batteries are frustrating but often preventable. Learn what causes battery failure and how to extend battery life.",
    author: "Mike Johnson",
    date: "2024-01-08",
    category: "Electrical",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F5dbffd29bdc44430ae6de4ae5f43d83f?format=webp&width=800",
    readTime: 5,
    content: `# Car Battery Dead? Troubleshooting Common Battery Issues

A dead car battery can strand you at the worst possible time. Understanding battery health and maintenance helps prevent these frustrating situations.

## Battery Basics

A typical car battery:
- Provides starting power for engine
- Powers electrical systems when engine is off
- Charges while engine runs via alternator
- Lasts 3-5 years on average
- Performs worse in cold weather

## 5 Reasons Your Battery Might Be Dead

### 1. Age
Batteries degrade over time. At 3-5 years, performance drops significantly, especially in cold climates.

**Solution:** Replace proactively before battery fails completely.

### 2. Parasitic Drain
Electrical systems drawing power when engine is off (dome lights, radio, security systems).

**Solution:** Check for faulty components or disconnected positive terminal overnight.

### 3. Corroded Battery Terminals
White, blue, or green corrosion on terminals reduces electrical connection.

**Solution:** Clean terminals with baking soda and water, or have professionally cleaned.

### 4. Alternator Failure
If the alternator doesn't charge properly, battery depletes while driving.

**Signs:** Dimming lights, failing to start after running, warning light
**Solution:** Alternator testing and replacement if needed

### 5. Extreme Cold
Cold weather thickens battery acid, reducing chemical reaction efficiency.

**Fact:** Battery power decreases about 50% in freezing temperatures

## Battery Testing

Professional battery testing measures:
- Voltage (should be 12.6V when rested)
- Cold cranking amps (CCA)
- Charge acceptance
- Overall health percentage

## Extending Battery Life

**Best Practices:**
- Keep terminals clean and corrosion-free
- Avoid extreme temperature exposure
- Don't leave lights or accessories on when parked
- Take short drives regularly
- Keep vehicle in garage in winter if possible
- Reduce electrical load on system

## Jump Starting Safely

If your battery dies:

1. Turn off both vehicles
2. Connect red cable to dead battery positive (+) terminal
3. Connect red cable to good battery positive (+) terminal
4. Connect black cable to good battery negative (-) terminal
5. Connect black cable to unpainted metal on dead vehicle
6. Start good vehicle, let run 2-3 minutes
7. Start your vehicle
8. Let run 20+ minutes before driving

**Never:** Use jumper cables while ignition is on

## When to Replace Your Battery

Replace your battery if:
- More than 3-4 years old
- Fails load test
- Doesn't hold charge between drives
- Cranks slowly when starting
- Battery case is swollen or leaking

## Battery Replacement Cost

- **Standard battery:** $100-$200
- **Premium/AGM battery:** $200-$400
- Installation included in most prices

## Winter Battery Care

- Have battery tested before winter
- Keep terminals clean
- Avoid extreme loads on system
- Plug in block heater if available

---

Our mobile mechanics can test your battery right at home, clean corroded terminals, replace old batteries, and diagnose charging system issues. We bring everything needed for professional battery service to your location.`,
  },
  {
    id: "4",
    slug: "ac-maintenance",
    title: "Keep Your AC Cool: Air Conditioning Maintenance Guide",
    excerpt: "Don't let summer heat catch you off guard. Regular AC maintenance ensures cool, comfortable drives all season.",
    author: "David Chen",
    date: "2024-01-05",
    category: "Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F18e25977dc7a4eb5ac11297d801851e9?format=webp&width=800",
    readTime: 6,
    content: `# Keep Your AC Cool: Air Conditioning Maintenance Guide

Nothing beats ice-cold air conditioning on a hot Florida day. Keeping your AC system functioning properly is essential for comfort and vehicle value.

## How Car AC Systems Work

Your vehicle's AC system consists of:

- **Compressor**: Pressurizes refrigerant
- **Condenser**: Releases heat from refrigerant
- **Evaporator**: Cools air inside cabin
- **Expansion valve**: Controls refrigerant flow
- **Refrigerant**: Carries heat from cabin

All components work together to cool your vehicle's interior.

## Signs Your AC Needs Service

**Weak Cooling:**
- Takes longer to cool vehicle
- Air blows cool but not cold
- Only cools on highway, not idle

**Strange Noises:**
- Grinding or squealing from compressor
- Clicking sounds when AC engages
- Clunking from compressor area

**Odors:**
- Musty smell from vents
- Burnt smell when AC turns on
- Sweet smell (refrigerant leak)

**Leaks:**
- Oil spots under vehicle
- Oily residue around AC components
- Visible refrigerant leaking

## AC Maintenance Schedule

**Annual:** 
- Visual inspection for leaks
- Compressor clutch operation check

**Every 1-2 Years:**
- Refrigerant level check
- Cooling performance test
- Filter/cabin air quality check

**Every 2-3 Years:**
- Refrigerant flush and refill
- System sealing check

## Common AC Problems and Solutions

### Refrigerant Leaks
**Symptoms:** Weak cooling, visible leaks
**Causes:** Corroded fittings, damaged hoses, worn seals
**Fix:** Seal leak, evacuate system, refill refrigerant

### Compressor Failure
**Symptoms:** AC won't turn on, grinding noise
**Causes:** Lack of lubrication, age, contamination
**Fix:** Compressor replacement

### Condenser Issues
**Symptoms:** Poor cooling, high pressure readings
**Causes:** Debris clogging, corrosion, damage
**Fix:** Cleaning or replacement

### Evaporator Blockage
**Symptoms:** Weak airflow, musty odor
**Causes:** Mold growth, debris accumulation
**Fix:** Evaporator cleaning or replacement

## AC Recharge Cost

- **Simple refrigerant recharge:** $100-$200
- **Includes leak detection:** $150-$250
- **Compressor replacement:** $500-$1,500
- **Full system repair:** $300-$1,000+

Prevention through regular maintenance is cheaper than major repairs.

## Summer AC Tips

**Maximize Efficiency:**
- Park in shade or use sunshade
- Crack windows before closing doors
- Let hot air escape first
- Use recirculation mode once cool
- Set temperature moderately (don't set too low)
- Service AC before summer heat

**Prevent Mold:**
- Use AC regularly, even in winter
- Run AC on defrost occasionally
- Keep cabin clean and dry

## Environmental Considerations

Modern AC systems use R-134a refrigerant. Proper handling prevents:
- Ozone layer damage
- Environmental contamination
- Regulatory violations

Always use certified technicians for AC work.

## When to Avoid DIY

AC system work requires:
- Special equipment (manifold gauges, vacuum pump)
- EPA certification
- Proper refrigerant handling
- System flushing capability

Professional service ensures safety and compliance.

---

Our certified mobile mechanics handle all AC services at your location. We diagnose problems, recharge systems, repair leaks, and ensure your vehicle stays cool all summer long.`,
  },
  {
    id: "5",
    slug: "tire-care",
    title: "Tire Maintenance and Safety: Everything You Need to Know",
    excerpt: "Proper tire care improves safety, fuel economy, and extends tire life. Learn essential tire maintenance tips.",
    author: "Jessica Garcia",
    date: "2023-12-28",
    category: "Tires",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Ffc560f9db0cd44dba832492ad68d29b8?format=webp&width=800",
    readTime: 7,
    content: `# Tire Maintenance and Safety: Everything You Need to Know

Tires are your vehicle's only contact with the road. Proper tire maintenance is crucial for safety, handling, and fuel economy.

## Tire Structure and Function

Modern tires consist of:
- **Tread**: Rubber grooves providing traction
- **Sidewall**: Flexible rubber maintaining tire shape
- **Bead**: Holds tire to wheel rim
- **Internal structure**: Steel belts and fabric layers
- **Valve stem**: Allows air inflation

## Tire Pressure: Get It Right

**Recommended Pressure:**
- Check owner's manual or driver's door jamb (not sidewall)
- Typical range: 32-36 PSI
- Check pressure when tires are cold (before driving)
- Adjust monthly

**Why It Matters:**
- Underinflated: Poor handling, excess heat, blowouts, low fuel economy
- Overinflated: Harsh ride, reduced contact patch, uneven wear
- Proper pressure: Optimal safety, efficiency, and tire life

## Tire Tread Depth

**Penny Test:**
1. Insert penny upside down into tread
2. If you see Lincoln's head, tread is too worn (2/32")
3. Replace tires immediately

**Professional Measurement:**
- New tires: 10-11/32" tread depth
- Minimum safe: 4/32" tread depth
- Replace at 2/32" (required by law)

**Driving Conditions:**
- Winter/snow: Consider replacing at 6/32"
- Wet roads: Traction decreases below 4/32"

## Tire Rotation

**Benefits:**
- Even wear across all tires
- Extended tire lifespan
- Improved handling balance

**Rotation Patterns:**
- **Front-wheel drive:** Rearward crossing (rear cross to front, front straight to rear)
- **Rear-wheel drive:** Rearward straight
- **All-wheel drive:** Rearward crossing

**Frequency:** Every 5,000-7,000 miles

## Wheel Alignment

**Signs of Misalignment:**
- Vehicle pulls to one side
- Uneven or rapid tire wear
- Steering wheel vibration
- Off-center steering wheel

**Effects of Poor Alignment:**
- Accelerated tire wear
- Poor handling and safety
- Increased fuel consumption
- Steering issues

**Frequency:** Check annually, align as needed (every 2-3 years typical)

## Tire Balancing

**Importance:**
- Smooth ride
- Extended tire and suspension life
- Improved fuel economy
- Prevents steering wheel vibration

**When to Balance:**
- New tire installation
- After rotation
- If vibration develops
- Before long trips

**Cost:** Usually $15-$30 per tire

## Winter Tire Considerations

**Winter Tires vs. All-Season:**
- Winter tires: Better cold weather grip, shorter stopping distance
- All-season: Adequate for mild winters
- Snow performance: Winter tires 25-50% better

**Changeover Times:**
- Switch to winter: Below 45°F consistently
- Switch to summer: Above 50°F consistently

## Tire Damage and Repairs

**Repairable:**
- Punctures in tread area
- Holes up to 1/4" diameter

**Not Repairable:**
- Sidewall damage
- Bulges or blisters
- Multiple punctures
- Damage near sidewall

## Tire Replacement Cost

- **Economy tires:** $50-$100 each
- **Mid-range tires:** $100-$200 each
- **Premium tires:** $200-$400+ each
- Balancing and mounting: $15-$30 each

Quality tires improve safety and fuel economy, paying for themselves over time.

## Storage Tips

**Proper Storage:**
- Cool, dry location
- Away from direct sunlight
- Away from ozone sources
- Vertical storage preferred (horizontal if stacked only 2)
- Check pressure periodically

## Professional Tire Services

Mobile mechanics can provide:
- Pressure checks and adjustments
- Tread depth measurement
- Visual inspection for damage
- Rotation service
- Balance service
- Tire replacement
- Alignment diagnostics

---

Our mobile mechanics bring tire service to your home. We check pressure, measure tread, rotate tires, identify damage, and handle replacements—all at your convenience.`,
  },
  {
    id: "6",
    slug: "engine-diagnostics",
    title: "Understanding Check Engine Light and Diagnostics",
    excerpt: "That warning light doesn't always mean expensive repairs. Learn what common trouble codes mean and when to worry.",
    author: "Mike Johnson",
    date: "2023-12-22",
    category: "Engine",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F94e4eba16ad54f84936a6f7af881d1ab?format=webp&width=800",
    readTime: 6,
    content: `# Understanding Check Engine Light and Diagnostics

The check engine light can cause panic, but it doesn't always mean your vehicle needs major repairs. Understanding what it means helps you respond appropriately.

## What Does Check Engine Light Mean?

Your vehicle's onboard diagnostic system (OBD-II) monitors emissions, engine, and transmission systems. When it detects a problem, it triggers the check engine light and stores a diagnostic trouble code (DTC).

**Important:** The light doesn't mean stop driving immediately—it's a diagnostic alert.

## When Check Engine Light Appears

The light can indicate:
- **Simple issues:** Loose gas cap, sensor malfunction
- **Moderate issues:** Misfire, fuel system problem, emission control issue
- **Serious issues:** Catalytic converter damage, severe misfire

## Common Trouble Codes

**P0420 - Catalyst System Efficiency Below Threshold**
- Catalytic converter not working properly
- Common cause: Faulty oxygen sensor
- Fix: Replace sensor or catalytic converter

**P0300 - Random/Multiple Cylinder Misfire**
- Engine misfires during combustion
- Causes: Bad spark plugs, fuel injector issues, compression problem
- Fix: Spark plug replacement, fuel service

**P0171 - System Too Lean (Bank 1)**
- Engine running with too little fuel
- Causes: Vacuum leak, faulty MAF sensor, fuel system issue
- Fix: Identify and seal leak, replace sensor

**P0440 - Evaporative Emissions System Malfunction**
- Issue with emissions control system
- Common cause: Loose gas cap (most common!)
- Fix: Tighten cap, seal fuel system leak if needed

**P0455 - Evaporative Emissions System Leak Detected (Large)**
- Similar to P0440 but indicates larger leak
- Causes: Cracked hose, faulty purge valve, bad cap
- Fix: Identify leak source, replace components

## Diagnostic Process

Professional diagnostics include:

1. **Code Reading:** Scan vehicle to identify DTCs
2. **Visual Inspection:** Check obvious issues
3. **Component Testing:** Test specific sensors and components
4. **System Analysis:** Identify root cause
5. **Repair Planning:** Determine necessary repairs

## Check Engine Light: When to Worry

**Drive Carefully:**
- Engine light on but vehicle runs normally
- Monitor for any changes
- Schedule diagnostic appointment soon

**Urgent Service:**
- Severe misfiring (jerking/stuttering)
- Engine overheating
- Loss of power
- Loud knocking noise
- Smell of rotten eggs

**Stop Driving:**
- Heavy smoke from engine
- Loss of brakes or steering
- Severe rattling noises

## DIY Diagnosis Limitations

**What You Can Do:**
- Check gas cap is tight
- Note when light appeared
- Document any symptoms

**Why Professional Service Matters:**
- $40-$100 diagnostic fee saves thousands
- Misdiagnosis leads to wrong repairs
- Modern vehicles require specialized equipment
- Proper diagnostics prevent guessing

## Common Mistakes

**Clearing Code Without Repair:**
Light goes off but problem remains. Code returns quickly.

**Ignoring Light:**
Minor issues become expensive repairs. Catalytic converter damage worsens.

**DIY Fixes:**
Using wrong parts or techniques costs more than professional repair.

## Catalytic Converter Issues

**Why It's Expensive ($500-$2,500):**
- Precious metals inside (platinum, palladium)
- Complex emission component
- Damage often prevented by addressing other issues

**Prevention:**
- Fix engine problems promptly
- Keep fuel system clean
- Use quality fuel

## Oxygen Sensor Importance

Oxygen sensors monitor exhaust composition and are common failure points.

**Symptoms of Bad O2 Sensor:**
- Check engine light
- Poor fuel economy
- Rough idle
- Hesitation on acceleration

**Cost:** $100-$300 depending on sensor location

## When to Get Diagnostic Service

**Schedule Soon:**
- Light on but car runs normally
- Light flashing intermittently
- No symptoms but light on

**Get Service This Week:**
- Light on with obvious symptoms
- Multiple warning lights
- Fuel economy suddenly worse

---

Our mobile mechanics bring diagnostic equipment to you. We read and interpret codes, identify problems accurately, and explain repair options—all at your driveway.`,
  },
  {
    id: "7",
    slug: "suspension-basics",
    title: "Suspension System 101: Signs and Repairs",
    excerpt: "A smooth ride depends on your suspension system. Learn what signs indicate suspension problems and repair costs.",
    author: "Robert Martinez",
    date: "2023-12-15",
    category: "Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F82386ba0d484475883f848caf812ea68?format=webp&width=800",
    readTime: 6,
    content: `# Suspension System 101: Signs and Repairs

Your suspension system handles shock absorption, wheel alignment, and vehicle control. Understanding suspension components helps you identify problems early.

## Suspension System Components

**Springs:**
- Support vehicle weight
- Absorb road bumps
- Two types: Coil springs and leaf springs

**Shock Absorbers (Shocks):**
- Dampen spring oscillation
- Control bounce and sway
- Improve tire contact with road

**Struts:**
- Combination of spring and shock
- Support vehicle weight
- Control movement
- Common on modern vehicles

**Control Arms:**
- Connect wheel to frame
- Allow up-and-down movement
- Maintain wheel alignment

**Anti-sway Bars (Sway Bars):**
- Reduce body roll during cornering
- Improve handling
- Connect suspension sides

**Bushings:**
- Rubber components reducing vibration
- Allow articulation between parts
- Wear out over time

## Signs of Suspension Problems

**Rough Ride:**
- Excessive bouncing
- Vehicle doesn't settle after bumps
- Feels like floating sensation

**Noise:**
- Clunking over bumps
- Creaking or squeaking sounds
- Rattling from suspension area

**Handling Issues:**
- Vehicle leans excessively in turns
- Nose dives when braking
- Rear end squats during acceleration
- Steering feels loose or vague

**Uneven Tire Wear:**
- One tire wears faster
- Inner or outer edge wears more
- Indicates alignment or suspension issue

**Fluid Leaks:**
- Oil leaking from shocks/struts
- Indicates internal seal failure
- Component needs replacement

## Shock and Strut Replacement

**When to Replace:**
- More than 50,000 miles
- Visible leaks
- Vehicle bounces excessively
- Uneven tire wear
- Vehicle sways too much

**Replacement Cost:**
- Shocks: $150-$300 each
- Struts: $300-$600 each
- Alignment often needed after

**Signs You Need Replacement:**
- Vehicle failing bounce test
- Difficulty controlling vehicle
- Excessive tire wear

## Strut vs. Shock

**Struts (MacPherson):**
- Include spring and shock
- Support vehicle weight directly
- Replace both spring and damper together
- Common on modern front-wheel drive cars

**Shocks (Traditional):**
- Separate from springs
- Only dampen spring motion
- Springs support weight separately
- Common on trucks and rear suspension

## Spring Replacement

**Signs of Bad Springs:**
- Vehicle sits lower than normal
- Sagging on one side
- Noise when going over bumps
- Harsh ride quality

**Replacement Cost:** $200-$500 per spring depending on vehicle

**Why Replace:**
- Worn springs affect handling
- Stress other suspension components
- Reduce tire contact with road

## Control Arm Bushings

**Function:**
- Cushion metal-to-metal connections
- Allow suspension movement
- Reduce vibration transmission

**Symptoms of Wear:**
- Increased road noise
- Vibration in steering
- Creaking sounds
- Poor handling response

**Replacement Cost:** $100-$250 per bushing depending on location

## Alignment After Suspension Work

**Why It's Important:**
- Suspension work shifts alignment
- Poor alignment causes tire wear
- Affects handling and safety

**Alignment Frequency:**
- After suspension repair: Essential
- Annually: Good practice
- When tire wear appears uneven: Immediately

**Cost:** $75-$200 for full alignment

## DIY vs. Professional Service

**Professional Suspension Work:**
- Requires special tools and lifts
- Safety critical work
- Alignment needed afterward
- Professional warranty on work

**When to DIY:**
- Visual inspection only
- Identifying symptoms
- Not actual repair work

## Preventive Maintenance

**Extend Suspension Life:**
- Avoid potholes when possible
- Don't overload vehicle
- Smooth driving habits
- Regular tire rotation and alignment
- Professional inspection annually

## Common Suspension Myths

**Myth:** Lowering springs improve handling
**Reality:** Proper suspension setup from manufacturer is optimal

**Myth:** All shocks are the same
**Reality:** Different vehicles need different damping rates

**Myth:** Suspension never needs maintenance
**Reality:** Regular inspection and timely repairs prevent problems

---

Our mobile mechanics diagnose suspension problems at your home. We identify worn components, test shocks, check alignment, and provide expert repair—all in your driveway.`,
  },
  {
    id: "8",
    slug: "headlight-restoration",
    title: "Restore Cloudy Headlights: Before and After Tips",
    excerpt: "Oxidized headlights reduce visibility and safety. Learn how professional restoration improves both appearance and performance.",
    author: "Sarah Mitchell",
    date: "2023-12-08",
    category: "Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2Fed5399a1ba734975b185d6fc2efdcd53?format=webp&width=800",
    readTime: 5,
    content: `# Restore Cloudy Headlights: Before and After Tips

Cloudy, oxidized headlights reduce visibility, create safety hazards, and diminish your vehicle's appearance. Professional restoration restores clarity and brightness.

## Why Headlights Get Cloudy

Modern headlights use clear polycarbonate plastic (instead of glass) for durability and design flexibility. However, plastic oxidizes when exposed to:

**UV Light:**
- Primary cause of cloudiness
- UV rays break down plastic surface
- Continuous exposure worsens condition

**Road Chemicals:**
- Salt, sand, and road spray
- Acid rain and environmental contaminants
- Oxidation compounds

**Heat Cycling:**
- Repeated heating and cooling
- Expands and contracts plastic
- Creates micro-cracks and cloudiness

**Age:**
- Plastic degrades over 5-10 years
- Most vehicles show significant cloudiness by 8-10 years

## Safety and Visibility Issues

**Cloudy Headlights Mean:**
- 50% less light output
- Reduced visibility at night
- Harder for other drivers to see you
- Potential safety hazard

**Modern Headlights:**
- LED and HID bulbs complex
- Cloudy lenses scatter light
- Effectiveness greatly reduced

## Signs Your Headlights Need Restoration

- Noticeable cloudiness or yellowing
- Reduced light output
- Water inside lens
- Safety inspection failures
- Failing to pass MOT/inspection

## Professional Restoration Process

**Step 1: Assessment**
- Examine oxidation severity
- Check for internal moisture
- Evaluate overall condition

**Step 2: Cleaning**
- Remove surface dirt and contaminants
- Clean lens thoroughly
- Prepare for restoration

**Step 3: Wet Sanding**
- Progressive grit sanding (starts coarse, gets finer)
- Removes oxidation layer
- Creates even surface
- Takes 30-45 minutes per headlight

**Step 4: Polishing**
- Fine polishing compounds
- Restores clarity
- Removes remaining cloudiness
- Brings back transparency

**Step 5: UV Protection**
- Clear UV-blocking coating applied
- Prevents future oxidation
- Extends restoration longevity
- Critical for long-term results

## DIY vs. Professional

**DIY Kits:**
- Sandpaper progression
- Polishing compound
- Temporary results (3-6 months)
- Inconsistent results
- Time-intensive

**Professional Restoration:**
- Commercial-grade equipment
- Expert techniques
- High-quality UV-blocking coat
- Lasts 1-2+ years
- Guaranteed results

## Headlight Restoration Cost

**Professional Service:**
- Both headlights: $150-$300
- Per headlight: $75-$150
- Mobile service available
- Protective coating included

**Worth It Because:**
- Improves safety
- Enhances appearance
- Extends lens life
- Better than replacement

## Replacement vs. Restoration

**Replacement Cost:**
- OEM headlights: $200-$500+ each
- Aftermarket: $100-$300+ each
- Labor: $100-$300
- Total: $400-$1,200+ for pair

**Restoration Cost:**
- $150-$300 for pair
- Saves hundreds vs. replacement
- Extends lens lifespan
- Maintains factory appearance

**When to Replace:**
- Internal moisture can't be cleared
- Lens is cracked or broken
- Water keeps appearing
- Yellowing too severe even for restoration

## Protective Coatings Explained

**UV Coating Benefits:**
- Blocks 99% of UV rays
- Prevents rapid re-oxidation
- Clear protective layer
- Maintains clarity longer

**Coating Longevity:**
- Professional grade: 1-2 years
- Varies by climate and sun exposure
- Southern Florida: More frequent recoating
- Can be reapplied annually

## Preventing Future Cloudiness

**Best Practices:**
- Park in garage or covered area
- Use quality UV protectant
- Regular washing prevents dirt accumulation
- Polish protective coat annually
- Avoid harsh chemicals

## Seasonal Considerations

**Summer (High Priority):**
- Intense UV exposure
- Oxidation accelerates
- Restoration needed before visibility affects safety

**Winter (Lower Priority):**
- Less UV exposure
- Cold slows oxidation
- Restoration can be deferred

## Modern LED/HID Headlights

**Complications:**
- More expensive to replace
- Some LEDs/HIDs can't be restored
- Internal components sensitive to moisture

**Restoration Still Helps:**
- Improves light output
- Makes modern headlights worth preserving

---

Our mobile mechanics restore headlights right in your driveway. We use professional-grade equipment, apply protective UV coating, and guarantee crystal-clear results—with no appointment waiting.`,
  },
  {
    id: "9",
    slug: "battery-terminal-care",
    title: "Preventing Battery Terminal Corrosion: Maintenance Tips",
    excerpt: "Battery terminal corrosion is a common cause of electrical problems. Learn how to prevent and clean corroded terminals.",
    author: "David Chen",
    date: "2023-11-30",
    category: "Electrical",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F5dbffd29bdc44430ae6de4ae5f43d83f?format=webp&width=800",
    readTime: 4,
    content: `# Preventing Battery Terminal Corrosion: Maintenance Tips

Battery terminal corrosion is easy to spot and easy to fix, but it can cause serious electrical problems. Regular maintenance prevents these issues.

## What Causes Battery Terminal Corrosion

**Chemical Reaction:**
- Battery produces hydrogen gas as byproduct
- Combines with oxygen in air
- Reacts with battery components
- Creates corrosion buildup

**Environmental Factors:**
- Humidity accelerates corrosion
- Salt air (coastal areas) worsens it
- Road salt spray increases corrosion
- Florida's humidity creates ideal conditions

**Overcharging:**
- Excessive battery charging
- Alternator issues causing overcharge
- Results in more hydrogen production
- Speeds corrosion formation

**Age:**
- Older batteries more prone to leaking
- Increased hydrogen production
- More corrosion buildup

## Types of Corrosion

**White/Gray Corrosion:**
- Most common
- Negative terminal
- Buildup accumulation

**Blue/Green Corrosion:**
- Positive terminal
- Often more severe
- Contains copper compounds

**Red Corrosion:**
- Positive terminal
- Battery acid damage
- More problematic

## Signs of Terminal Corrosion

- Visible white, blue, or green crusty buildup
- Difficulty starting engine
- Dim headlights
- Electrical problems
- Burning smell near battery
- Battery terminal feels hot

## Cleaning Corroded Terminals

**What You'll Need:**
- Wrench (battery disconnect tool)
- Baking soda
- Water
- Wire brush
- Plastic scraper
- Gloves
- Safety glasses
- Battery terminal protector (optional)

**Step-by-Step:**
1. Disconnect negative (-) terminal first
2. Disconnect positive (+) terminal
3. Mix baking soda with water (1:1 ratio)
4. Apply mixture to corroded areas
5. Scrub with wire brush
6. Rinse thoroughly with water
7. Dry completely with cloth
8. Reconnect positive terminal first
9. Reconnect negative terminal
10. Apply terminal protector if available

**Time Required:** 20-30 minutes

## Professional Terminal Cleaning

**Advantages:**
- Complete battery system inspection
- Alternator charging test
- Cleaning more thorough
- Terminal protective coating applied
- Diagnose underlying issues

**Cost:** $50-$100

**Worth It Because:**
- Prevents electrical problems
- Extends battery life
- Identifies charging issues
- Applied protective coat

## Terminal Protective Coatings

**Benefits:**
- Prevents corrosion formation
- Red or blue plastic covers
- Isolated terminal from air
- Extends battery life

**Application:**
- Fits over battery terminals
- Simple installation
- Removable if needed
- Inexpensive: $5-$15

## Battery Terminal Maintenance

**Monthly:**
- Visual inspection
- Check for corrosion
- Ensure tight connections

**Every 6 Months:**
- Clean terminals if needed
- Check tightness
- Apply protective coating if missing

**Annually:**
- Professional battery test
- Terminal inspection and cleaning
- Charging system check

## Preventing Corrosion

**Best Practices:**
- Keep battery terminals clean
- Check charging system annually
- Ensure proper battery fit (no movement)
- Keep battery dry
- Apply terminal protector
- Address alternator issues immediately
- Use quality battery

## Charging System Problems

If corrosion forms quickly despite cleaning:
- Alternator may be overcharging
- Battery may be faulty
- Have charging system tested

**Testing:** $50-$100 for professional test

## Signs of Larger Battery Problems

**When Cleaning Isn't Enough:**
- Corrosion returns within weeks
- Multiple electrical problems
- Difficulty starting even after cleaning
- Battery swelling or leaking

**Next Steps:**
- Full battery test
- Charging system diagnostic
- Possible battery replacement

## Safety Precautions

**Battery Safety:**
- Wear gloves and safety glasses
- Baking soda neutralizes acid
- Don't create sparks near battery
- Keep metal tools away
- Disconnect negative terminal first

## When to Call Professional

**DIY if:**
- Surface corrosion only
- Comfortable with basic tools
- No electrical issues

**Professional Service if:**
- Heavy or stubborn corrosion
- Corrosion returns quickly
- Electrical issues present
- Unsure about safety

---

Our mobile mechanics clean battery terminals professionally, test your charging system, and apply protective coatings—all at your location. We identify and fix problems before they strand you.`,
  },
  {
    id: "10",
    slug: "pre-trip-inspection",
    title: "Pre-Trip Vehicle Inspection Checklist for Road Trips",
    excerpt: "Before heading out on a long road trip, use this comprehensive checklist to ensure your vehicle is road-ready and safe.",
    author: "Jessica Garcia",
    date: "2023-11-22",
    category: "Maintenance",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fbd2db2bf76dc466fa0ee7e5d644defec%2F94e4eba16ad54f84936a6f7af881d1ab?format=webp&width=800",
    readTime: 8,
    content: `# Pre-Trip Vehicle Inspection Checklist for Road Trips

Long road trips put extra stress on your vehicle. This comprehensive checklist ensures your car is ready for safe, trouble-free travel.

## Fluid Checks (Essential)

**Engine Oil:**
- Check level when engine is cold
- Should be between min and max marks
- Top off if low with correct grade
- Consider oil change if last change >5,000 miles ago

**Coolant:**
- Check when engine is cool
- Inspect hoses for leaks or cracks
- Look for white residue (sign of leak)
- Top off if low (equal parts water/coolant)

**Brake Fluid:**
- Should be near full line
- Dark fluid indicates age
- Top off if low
- Professional flush if appears dirty

**Transmission Fluid:**
- Check with engine running, in Park
- Should be bright red and smell fresh
- Dark or burnt smell = service needed
- Top off if low

**Power Steering Fluid:**
- Check with engine off
- Should be near full line
- Pinkish color is normal
- Top off if low

**Windshield Washer Fluid:**
- Fill reservoir completely
- Essential for visibility during trip
- Low cost and easy to refill

## Tire Inspection

**Pressure:**
- Inflate to recommended PSI (door jamb or manual)
- Check when cold (before driving)
- Adjust if pressure varies more than 3 PSI
- Florida heat increases pressure, factor in extra miles

**Tread Depth:**
- Use penny test on all tires
- Minimum acceptable: 4/32" (legal minimum 2/32")
- For road trips: Prefer 6/32" minimum
- Replace if worn unevenly

**Condition:**
- Inspect for cracks, bulges, or damage
- Check sidewalls for wear or damage
- Look for objects embedded in tire
- All tires should match condition

**Spare Tire:**
- Verify it's properly inflated
- Check condition and tread
- Ensure jack and lug wrench are present
- Practice changing tire before trip

## Braking System

**Visual Inspection:**
- Look at brake pads (if visible)
- Rotors should be smooth, not scored
- Check for fluid leaks

**Brake Performance:**
- Test brakes at slow speed before trip
- Should feel responsive, not soft
- No grinding or squealing should be present
- Brake pedal shouldn't go to floor

**Professional Check If:**
- Any signs of brake problems
- Last brake service >2 years ago
- Brake fluid dark or contaminated
- Any brake warning lights

## Electrical System

**Battery:**
- Check for corrosion on terminals
- Clean terminals if corroded
- Ensure connections are tight
- Battery should be less than 4-5 years old

**Lights:**
- Turn on headlights, high beams, fog lights
- Check turn signals (front and rear)
- Test brake lights (have someone help)
- Test reverse lights
- Check interior lights

**Wipers:**
- Replace blades if streaking or chattering
- Ensure they work at all speeds
- Check washer nozzles spray correctly
- Important for visibility in rain

## Engine and Cooling System

**Visual Inspection:**
- Check for fluid leaks under engine
- Look for loose hoses or belts
- Belts should be tight, not cracked
- Check fluid levels mentioned above

**Cooling System:**
- Radiator should be clean, not clogged
- Check hose connections are secure
- Look for leaks or damage
- Thermostat should open/close properly

**Heating (Winter):**
- Heater should produce hot air
- Fan should work at all speeds
- Important for emergency warmth

## Air Conditioning (Summer)

**Performance:**
- AC should blow cold air within minutes
- All vents should deliver air
- No strange noises
- No burning smells

**Professional Check If:**
- AC not cooling adequately
- Musty odors present
- Compressor making noise

## Suspension and Steering

**Steering:**
- Wheel should be centered
- No excessive play or looseness
- Steering should be responsive
- No grinding or clunking sounds

**Suspension:**
- Car shouldn't sit noticeably lower on one side
- No unusual noises over bumps
- Handling should feel stable
- No excessive bouncing

## Interior and Exterior

**Windshield:**
- No cracks in driver's line of sight
- Clean glass for good visibility
- Chip repair kit if needed

**Mirrors:**
- All mirrors should be clean and properly positioned
- Adjust for full visibility
- Side mirrors should show blind areas

**Seatbelts:**
- All belts should latch securely
- No fraying or damage
- Test for smooth operation

**Windows:**
- All windows should roll down smoothly
- Locks should function
- Seals should be intact

## Documentation and Tools

**Essential Documents:**
- Vehicle registration
- Insurance information and card
- Current maintenance records
- Owner's manual
- Breakdown/roadside assistance number

**Emergency Kit:**
- Spare tire (verified good)
- Jack and lug wrench
- Basic tool kit (wrench, socket set, pliers)
- Jumper cables
- Flashlight and batteries
- First aid kit
- Fire extinguisher
- Spare coolant and oil
- Spare belts
- Hoses and clamps
- Fuses

**Communication:**
- Charged phone with charger
- GPS or maps
- Emergency contacts

## Pre-Trip Service Checklist

**Consider Professional Service 1-2 Weeks Before:**
- Oil and filter change
- Fluid top-off and inspection
- Tire rotation and balance
- Brake inspection
- Battery test
- Cooling system flush (if needed)
- AC performance check
- All fluid checks above

**Cost:** $100-$300 depending on services needed
**Value:** Prevents breakdowns during trip, ensures safety

## Climate Considerations for Florida

**Heat Management:**
- Extra attention to AC system
- Check coolant levels frequently on trip
- Don't skip radiator cleaning
- Battery works harder in heat

**Humidity Considerations:**
- Check battery terminals (corrosion common)
- Ensure AC works perfectly
- Verify defroster for rain visibility

**Long Drive Strategy:**
- Stop every 2-3 hours
- Check fluid levels and tire pressure
- Take breaks from driving
- Ensure proper sleep before long drives

## What to Do If Problem Appears During Trip

**Warning Lights:**
- Don't ignore check engine or warning lights
- Pull over safely to investigate
- Call roadside assistance if uncertain

**Unusual Noises:**
- Listen carefully to location
- If safety risk, pull over immediately
- Contact mobile mechanic service

**Loss of Function:**
- Brakes fail: Downshift, use emergency brake
- Steering issues: Pull over immediately
- Engine overheating: Turn off AC, turn on heat, pull over

---

A comprehensive pre-trip inspection prevents 90% of roadside breakdowns. Our mobile mechanics provide thorough pre-trip inspections at your home or office—ensuring your vehicle is ready for any journey.`,
  },
];

export const categories = [
  "Brakes",
  "Engine",
  "Electrical",
  "Maintenance",
  "Tires",
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (category: string) => {
  return blogPosts.filter((post) => post.category === category);
};

export const getRelatedPosts = (slug: string, limit = 3) => {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return blogPosts
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, limit);
};

export const getRecentPosts = (limit = 5) => {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, limit);
};
