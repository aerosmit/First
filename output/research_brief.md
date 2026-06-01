# Research Brief: Payday Lending Statistics for MOLTMATCH Novel

## The Draft's Claim vs. Verified Sources

**Draft states:** "The average fee on a $400 two-week loan, for the borrower cohort our models most commonly approve, is $68. The annualized interest rate on that structure is approximately 442 percent."

---

## 1. Average Fee on a $400 Payday Loan

**CFPB (primary source):**
> "Fees for storefront payday loans generally range from $10 to $30 for every $100 borrowed. The median $15 fee per $100 would mean that the borrower must come up with more than $400 [for a $350 loan] in just two weeks."
— CFPB, "What are the costs and fees for a payday loan?" (consumerfinance.gov)

- At the median fee of **$15 per $100**, a $400 loan costs **$60** in fees.
- State law caps range from $10 to $30 per $100 borrowed.

**Pew Charitable Trusts:**
> "Average borrowers pay $520 in fees for a $375 loan." (This reflects rollover costs over 5 months, not a single-loan fee.)
— Pew Charitable Trusts, Safe Small-Dollar Loans Research Project

**Assessment:** The draft's $68 fee implies ~$17 per $100 — above the $15 median but within documented state-level ranges. It is internally consistent and defensible as a fictional specific for a higher-fee state's average borrower cohort.

---

## 2. APR on Payday Loans

**CFPB (primary source):**
> "A loan outstanding for two weeks with a $15 fee per $100 has an Annual Percentage Rate (APR) of 391 percent."
— CFPB, "What is an annual percentage rate (APR) and why is it higher than the interest rate for my payday loan?" (consumerfinance.gov)

**Center for Responsible Lending (June 2023):**
- Report: *"Red Alert Rates: Annual Percentage Rates on $400, Single-Payment Payday Loans in the United States"*
- APRs on $400 single-payment payday loans across US states range from **140% to 662%**.
- The report confirms that states with few consumer protections see APRs in the 300–660% range.

**Assessment:** The draft's 442% is within the CRL's documented range for $400 loans specifically. The CFPB's most cited benchmark is 391% (at $15/$100). The novel can cite CRL 2023 for 442% defensibly, as it falls squarely within documented state variation.

**Recommended revision:** Change "approximately 442 percent" to "approximately 391 percent" and source it to CFPB directly — this is cleaner, more authoritative, and adjusts the fee to $60 (the CFPB's median). Alternatively, keep 442% and calibrate it to a state like Tennessee (documented at higher rates) as the fictional underwriting context.

---

## 3. Largest Payday Lending Chains (2024)

Real companies operating storefront payday lending in the US as of 2024:
- **Advance America** — 800+ locations (largest by storefront count)
- **ACE Cash Express** — 700+ locations
- **Check Into Cash** — major chain
- **Speedy Cash** — 10M+ customers served since 1997
- **CashNetUSA** (Enova International) — online; 4M+ customers
- **Community Choice Financial**

Source: Payday Loans Market Report 2024 (Globe Newswire, Nov 2024); individual company sites.

**Assessment:** The draft's claim that four of the eight largest payday-lending chains use the fictional Lattice Financial's underwriting API is plausible given the real market structure. The companies listed above are all real and should not be named in the fiction — the narrative uses "four of the eight largest" which is appropriately unspecific.

---

## 4. CFPB Rulemaking Timeline (Novel Set in 2025)

- **2017:** CFPB issues Small Dollar Lending Rule including mandatory ability-to-repay requirements.
- **2020:** CFPB (under new leadership) rescinds the ability-to-repay provisions; payment provisions remain.
- **2024:** Supreme Court (CFPB v. Community Financial Services Assn.) rules that CFPB's funding structure is constitutional.
- **2025 (novel's timeline):** CFPB announces it will not enforce or supervise payday lenders under the rule; no fines or penalties. Effective regulatory rollback.

**Source:** consumerfinance.gov/compliance/compliance-resources/consumer-lending-resources/payday-lending-rule/ ; American Banker (March 2025)

**Novel implication:** A 2025 Lattice Financial would be operating in an environment of regulatory rollback — the CFPB has pulled back from enforcement. This is accurate to the novel's period and can be referenced without contradiction.

---

## Summary for Final Editor

| Claim | Draft | Best Sourced Version | Source |
|-------|-------|---------------------|--------|
| Fee on $400 loan | $68 | $60 (at median) | CFPB |
| APR | 442% | 391% (at median) or up to 662% by state | CFPB; CRL 2023 |
| Borrowers per year | not cited | 12 million | CFPB |
| P99 latency 340ms | fictional | Plausible for 2025 ML inference | No sourcing needed |

**Verdict on the $68/442% figure:** Mathematically consistent, within the documented range (CRL's 2023 $400-loan-specific survey shows up to 662%). However, the cleanest approach for citation is to use the CFPB's own published figures: $60 fee / 391% APR. The fiction's moral weight is identical either way.
