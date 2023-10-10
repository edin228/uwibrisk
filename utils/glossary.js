const terms = [
  // {
  //   term: "401(K)",
  //   definition:
  //     "A plan sponsored by employers which allows participating employees the opportunity to defer taxation on a portion of regular salary or bonuses by electing to have such amounts contributed to the plan instead of receiving them as cash.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "A0E/COE (ARISING OUT OF AND OCCURRING IN THE COURSE OF EMPLOYMENT)",
  //   definition:
  //     "This means that an industrial injury must be caused by and happen on the job.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ADVERTISING INJURY",
  //   definition:
  //     "Bodily Injury or Property Damage resulting from inappropriate, incorrect or libelous advertising practices, not otherwise excluded by a policy.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "AGREED MEDICAL EXAMINER (AME)",
  //   definition:
  //     "A physician selected by your attorney and the claims administrator who conducts a medical evaluation and submits a comprehensive report to the parties.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ALL-RISK",
  //   definition:
  //     "Insurance against loss or damage to property from any cause, except those that are specifically excluded.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ALTERNATE WORK",
  //   definition:
  //     "A different job with your employer when you are found to have work restrictions which prevent you from permanently returning to your usual and customary job.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ANNUAL AGGREGATE",
  //   definition:
  //     "The maximum dollar amount that can be paid under a policy during a one-year period.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ANY ONE CLAIM FOR INCIDENT RESPONSE COVERAGES",
  //   definition:
  //     "Is there a full additional limit to manage incident response costs, including a forensic investigation and breach notification, in order to protect the main policy limit to pay for subsequent costs to handle potential litigation or regulatory costs?",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "APPLICANT",
  //   definition:
  //     "The party, usually the injured worker, who establishes a case before the Workers’ Compensation Appeals Board (WCAB).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "APPLICATION FOR ADJUDICATION OF CLAIM (APPLICATION OR APP)",
  //   definition:
  //     "Filing this form establishes a case before the Workers’ Compensation Appeals Board (WCAB). A WCAB case number will be assigned.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "APPORTIONMENT",
  //   definition:
  //     "A way of figuring out how much of your permanent disability is due to your industrial injury and how much is due to other disabilities.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ASSET ALLOCATION",
  //   definition:
  //     "The process of dividing the assets in a portfolio among various asset classes to either a) maximize the portfolio’s return for a given level of risk; or b) maximize the portfolio’s risk for a given level of return.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "AUDIT UNIT",
  //   definition:
  //     "A unit within DWC that receives complaints against claims administrators. These complaints may lead to an investigation or audit of the company’s claims handling practices.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BENEFIT CONSULTANT",
  //   definition:
  //     "An individual or organization hired by a group plan holder to review, analyze, and make recommendations on benefit strategies, including benefit plan design, carrier selection, pricing, etc. An insurance professional who provides information, advice and counseling for their clients.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BI WAITING PERIOD",
  //   definition:
  //     "The amount of time that has to pass before the Business Interruption coverage will begin to pay out.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BINDER",
  //   definition:
  //     "Written acknowledgement that insurance applied for is in force, whether or not the premium had been paid or the policy issued.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BOP (BUSINESS OWNERS POLICY)",
  //   definition:
  //     "A package insurance policy that is made up of multiple lines or types of insurance. A BOP usually includes property and general liability insurance.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BREACH OF PRIVACY STATEMENT",
  //   definition:
  //     "Protection for the insured in the event they are non-compliant with their corporate Privacy Policy.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUSINESS INTERRUPTION COVERAGE",
  //   definition:
  //     "Commercial property insurance covering loss of income suffered by a business when damage to its premises by a covered cause of loss causes a slowdown or suspension of its operations. Coverage applies to loss suffered during the time required to repair or replace the damaged property. It may also be extended to apply to loss suffered after completion of repairs for a specified number of days.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUSINESS INTERRUPTION INSURANCE",
  //   definition:
  //     "A type of policy that pays for loss of earnings when operations are curtailed or suspended because of a covered property loss.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUSINESS INTERRUPTION SECURITY FAILURE",
  //   definition:
  //     "1st party coverage to pay for the lost online revenues the insured suffers while being shut down due to a hacking event (a security compromise/failure).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUSINESS INTERRUPTION SYSTEM FAILURE",
  //   definition:
  //     "Further broadening the 1st party business interruption coverage to pay for the lost online revenues the insured suffers while being shut down due to a systems failure such as a human error as opposed to just a security failure.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUSINESS PROPERTY & EQUIPMENT COVERAGE",
  //   definition:
  //     "Also known as Business Personal Property coverage, it may cover office contents (furniture, equipment and supplies), your inventory, materials, supplies, fixtures, machinery and tenant’s improvements.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "BUY/SELL AGREEMENT",
  //   definition:
  //     "Provides for the transfer of ownership of the business in certain circumstances, including death and disability. The agreement prevents an owner from selling his or her interests to an outsider without the consent of the other owners. Proper funding should be in place to ensure that money is available to buy the shares of a deceased or disabled owner. Life insurance is often coupled with the agreement to satisfy this prerequisite.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CAFETERIA PLAN",
  //   definition:
  //     "An employee benefit plan that offers participants a choice between cash and one or more qualified, or tax-favored, benefits. To obtain the benefit of tax-favored treatment, the plan must comply with Internal Revenue Code Section 125. Typical benefits include health insurance, group term life and dental benefits.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CERTIFICATE OF INSURANCE",
  //   definition:
  //     "A document which serves as proof of the types of coverage, amounts of coverage and policy effective dates of an insurance policy. Certificates are held by the insured or, in some cases, by a company or person to whom the insured is potentially liable.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CLAIM FORM",
  //   definition: "A form to report a work injury or illness to your employer.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CLAIMS ADMINISTRATOR",
  //   definition:
  //     "This is the term for insurance companies and others who handle your workers’ compensation claim.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CLAIMS-MADE COVERAGE",
  //   definition:
  //     "A policy providing coverage only if a claim is made during the policy period. If the policy has a retroactive date, a loss which occurred before that date is not covered. (See Occurrence Coverage for comparison.)",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "COINSURANCE, CO-INSURANCE, A COINSURANCE CLAUSE",
  //   definition:
  //     "Commercial property insurance policies generally are subject to a coinsurance clause of either 80%, 90%, or 100%. Assuming your policy has an 80% coinsurance clause, it doesn’t mean you’ll only receive 80% of your loss, it means that (at the time you sustain a property claim, such as a fire), your policy coverage limit must be equal to at least 80% of the full, current replacement cost, as of the time of the loss, in order to avoid being subject to a “coinsurance penalty.” Maintaining ample coverage is the responsibility of the policyholder, but most qualified insurance brokers are available, if you make a formal request, to assist you to calculate sufficient limit to avoid a potential coinsurance penalty.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "COMMERCIAL PACKAGE POLICY",
  //   definition:
  //     "A package insurance policy that provides both general liability and property coverage for businesses and other organizations.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "COMMUTATION",
  //   definition:
  //     "An order by a Workers’ Compensation Administrative Law Judge for a lump sum payment of part or all of your permanent disability award. Payment can be made to either the injured worker or the injured worker’s attorney. This order can only be requested after you have either settled your case with a Stipulation with Request for Award or received a Findings and Award.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "COMPROMISE AND RELEASE (C&R)",
  //   definition:
  //     "Generally, a final settlement of your workers’ compensation case where the parties agree on a single lump sum payment. It usually settles all outstanding issues except for future vocational rehabilitation.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CONSOLIDATED OMNIBUS BUDGET RECONCILIATION ACT OF 1985 (COBRA)",
  //   definition:
  //     "The federal law that requires employers with more than 20 employees to extend group health insurance coverage for up to 36 months after a qualifying event (e.g. termination of employment, reduction in hours, divorce). The right to continue such coverage ends when a qualified beneficiary becomes covered under any other group health plan that does not contain any pre-existing condition or other limitations.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CONSULTATIVE RATING",
  //   definition:
  //     "A rating of permanent disability provided by the DWC Disability Evaluation Unit when a claim is litigated or if the injured worker has an attorney. See Permanent Disability Rating.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CONTINGENT BUSINESS INTERRUPTION",
  //   definition:
  //     "1st party coverage to pay for the lost online revenues the insured suffers while being shut down due to a hacking event that takes place at a named 3rd party provider. Provided must be requested and approved by insurer.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "COPAYMENT, CO-PAY, CO-PAYMENT",
  //   definition:
  //     "A co-pay is a common feature of many health insurance plans, where the insured pays a set out-of-pocket amount for health care services. Insurance providers often charge co-pays for services such as doctor visits or prescriptions drugs. Co-pays are a specified dollar amount rather than a percentage of the bill, and they are often paid at the time the service is rendered.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CREDIT MONITORING",
  //   definition:
  //     "1st party coverage to offer credit monitoring services to the affected individuals of the insured’s security breach.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CRIME – EMPLOYEE THEFT – EMBEZZLEMENT PROTECTION",
  //   definition:
  //     "A crime insurance policy that is designed to meet the needs of organizations other than financial institutions (such as banks). A commercial crime policy typically provides several different types of crime coverage, such as: employee dishonesty coverage; forgery or alteration coverage; computer fraud coverage; funds transfer fraud coverage; kidnap, ransom, or extortion coverage; money and securities coverage; and money orders and counterfeit money coverage.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CRISIS MANAGEMENT/PUBLIC RELATIONS",
  //   definition:
  //     "1st party coverage to pay for the hiring of a Public Relations firm to help minimize the damage done to an insured’s reputation following a security breach.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CUMULATIVE TRAUMA (CT)",
  //   definition:
  //     "An injury or illness that occurs over a period of time. For example, Carpal Tunnel Syndrome.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CYBER CRIME – CYBER-SECURITY BREACH – DATA THEFT PROTECTION",
  //   definition:
  //     "Also known as Cyber coverage, it’s designed to cover a variety of losses that may result when a business engages in various electronic activities, such as selling on the Internet or being the victim of a data breach of its internal or hosted electronic network and data.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "CYBER EXTORTION",
  //   definition:
  //     "1st party coverage to pay for the insured’s losses in the event a hacker steals data and tries to extort from the insured money so that the hacker does not disclose the information and/or returns the information to the insured.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DATA RESTORATION",
  //   definition:
  //     "1st party coverage to recover or recreate data lost in a security breach",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DEATH BENEFITS",
  //   definition:
  //     "Benefits paid to surviving dependents if a work related injury or illness results in death within five years.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DECLARATION OF READINESS (DOR OR DR)",
  //   definition:
  //     "A form to request a hearing before a Workers’ Compensation Administrative Law Judge in order to resolve a dispute.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DEFENDANT",
  //   definition:
  //     "The employer or his/her representative, usually the insurance company.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DEFINED CONTRIBUTION APPROACH (HEALTH INSURANCE)",
  //   definition:
  //     "A retiree health program that commits to a specified level of annual contributions to an employee’s health care account during his or her working years. The value of the account at retirement is used to provide health care benefits.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DEFINED CONTRIBUTION PLAN",
  //   definition:
  //     "Defined by the Internal Revenue Code and ERISA as a plan that provides for an individual account for each participant and for benefits based solely on (1) the amount contributed to the participant’s account plus (2) any income, expenses, gains and losses, and forfeitures of accounts of other participants that may be allocated to the participant’s account. 401(k), 403(b) and 457 plans are defined contribution plans.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DEPOSITION",
  //   definition:
  //     "A formal session in which an attorney asks questions of a party under oath. It is the equivalent of testifying at a trial. The testimony is recorded by a court reporter and may be used as evidence in a trial situation. Depositions may only take place if an Application for Adjudication has been filed.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DETERMINATION AND ORDER (D&O)",
  //   definition:
  //     "A decision by the Rehabilitation Unit on a vocational rehabilitation dispute.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DIGITAL MEDIA/CONTENT",
  //   definition:
  //     "3rd party liability coverage for content disputes due to the insured’s digital media on their website or other electronic forms",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DIRECTOR’S & OFFICERS (MISMANAGEMENT) PROTECTION",
  //   definition:
  //     "May protect directors and officers against claims made while serving on a board of directors and/or as an officer. In effect, the policies function as “management errors and omissions liability insurance,” covering claims resulting from managerial decisions that have adverse financial consequences.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DISABILITY EVALUATION UNIT (DEU)",
  //   definition:
  //     "A unit within DWC that calculates the percent of permanent disability based upon the medical reports.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DISABILITY PROTECTION",
  //   definition:
  //     "Health insurance that provides periodic payments to replace income lost when the insured is unable to work as a result of sickness or injury.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "DIVISION OF WORKERS’ COMPENSATION (DWC)",
  //   definition:
  //     "The state agency that oversees the California workers’ compensation system.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "E&O OR PROFESSIONAL MALPRACTICE",
  //   definition:
  //     "An insurance form that protects the insured against liability for committing an error or omission in performance of professional duties. Generally, such policies are typically designed to cover financial losses.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EARTHQUAKE",
  //   definition:
  //     "Typically excluded (along with other earth movement) from most property insurance policies, except ensuing fire.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ELECTRONIC DATA PROCESSING COVERAGE",
  //   definition:
  //     "Specialized type of insurance designed to cover your computer equipment, data systems, information storage media and expenses or income loss related to the destruction of hardware or software.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EMPLOYEE ASSISTANCE PROGRAM (EAP)",
  //   definition:
  //     "An employment-based health service program designed to assist in the identification and resolution of a broad range of employee personal concerns that may affect job performance. These programs deal with situations such as substance abuse, marital problems, family troubles, stress and domestic violence, as well as health education and disease prevention. The assistance may be provided within the organization or by referral to outside resources.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EMPLOYEE DISHONESTY",
  //   definition:
  //     "Protection against allegations of employee theft of tangible or intangible property from a client. Coverage should be provided on your premises and at the customer’s location.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EMPLOYER’S NON-OWNED AUTO LIABILITY",
  //   definition:
  //     "Liability faced by the employer when an employee uses his or her own personal vehicle on company business.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EMPLOYMENT PRACTICES LIABILITY INSURANCE (EPLI)",
  //   definition:
  //     "Protection against claims of discrimination based on age, gender, race, religion or other factors.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EPLI, DISCRIMINATION, WRONGFUL TERMINATION PROTECTION",
  //   definition:
  //     "Also known as EPLI coverage, it’s designed to cover losses due to wrongful termination, discrimination, sexual harassment, hostile work environment and in some cases, even wage and hour disputes.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ERRORS AND OMISSIONS COVERAGE",
  //   definition:
  //     "Protection against claims that you or your employee made mistakes through error or oversight that caused a loss of productivity or loss of revenue.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EXCLUSIONS",
  //   definition:
  //     "Causes of loss, conditions or property specified in the policy which are not covered by the policy.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EXTENDED REPORTING PERIOD",
  //   definition:
  //     "A specified period allowing someone to make claims after the expiration of a “claims-made” policy",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "EXTRA EXPENSE INSURANCE",
  //   definition:
  //     "Insurance providing the extra funds needed to continue a business without interruption following a covered property loss.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FAMILY AND MEDICAL LEAVE ACT OF 1993 (FMLA)",
  //   definition:
  //     "Requires employers with more than 50 employees to provide eligible workers with up to 12 weeks of unpaid leave each year for birth, adoptions, foster care placements, and illnesses of employees and their families.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FINDINGS & AWARD (F&A)",
  //   definition:
  //     "A Workers’ Compensation Administrative Law Judge’s decision finding that an applicant is entitled to disability benefit payments, future medical treatment, or both.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FINDINGS & ORDER (F&O)",
  //   definition:
  //     "A Workers’ Compensation Administrative Law Judge’s decision in which no disability payments or future medical treatment is awarded",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FIRST AID",
  //   definition:
  //     "Any one-time treatment, and any follow-up visit for the purpose of observation, of minor scratches, cuts, burns, splinters, etc. which do not ordinarily require medical care. The one-time treatment and follow-up visit for observation may be provided by a physician or registered professional personnel.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FLOOD",
  //   definition:
  //     "Coverage for damage to property caused by flood. May be available by endorsement to an all risks policy or to a difference-in-conditions (DIC) policy. Normally, the coverage provided is subject to a per occurrence sublimit, an annual aggregate limit, and a separate deductible.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FORENSICS COSTS",
  //   definition:
  //     "1st Party coverage to pay for the hiring of a forensics team to determine the scope of a security breach",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FRAUD",
  //   definition:
  //     "Any knowingly false or fraudulent material statement for the purpose of obtaining or denying workers’ compensation benefits.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FUNDS TRANSFER FRAUD COVERAGE – ELECTRONIC",
  //   definition:
  //     "A financial institution crime coverage that relates to the erroneous transferring of funds to or from the checking or savings account of a customer based upon instructions fraudulently transmitted by a non-employee. There are two categories of this type of fraud coverage, voice initiated and tele-facsimile",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "FUTURE MEDICAL",
  //   definition:
  //     "On-going entitlement to medical treatment for a work related injury.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "GENERAL LIABILITY INSURANCE",
  //   definition:
  //     "Covers bodily injury and property damage liability for incidents that occur on holder’s premises or at holder’s customer’s location.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "GENERAL LIABILITY PROTECTION",
  //   definition:
  //     "May cover liability for injuries or property damage sustained by third-parties. It may cover accidents occurring on your premises or away from your premises as a result of business operations. It may also cover injuries sustained by third parties resulting from products you have sold or manufactured.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "GROUP HEALTH, GROUP BENEFITS",
  //   definition:
  //     "Group Health is an employee benefit plan established or maintained by an employer or by an employee organization (such as a union), or both, that provides medical care for participants or their dependents through insurance.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "HEALTH INSURANCE PORTABILITY AND ACCOUNTABILITY ACT OF 1996 (HIPAA)",
  //   definition:
  //     "Federal legislation that improves access to health insurance when changing jobs by restricting certain preexisting condition limitations, and guarantees availability and renewability of health insurance coverage for all employers, regardless of claims experience or business size.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "HEALTH MAINTENANCE ORGANIZATION (HMO)",
  //   definition:
  //     "Prepaid group health insurance plan which entitles members to services of participating physicians, hospitals, and clinics. Emphasis is on preventative medicine. Members pay a flat periodic fee.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "HEARINGS",
  //   definition:
  //     "Formal proceedings held at the Workers’ Compensation Appeals Board (WCAB) before a Workers’ Compensation Administrative Law Judge.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "HIRED AUTO LIABILITY",
  //   definition:
  //     "Liability the employer is exposed to when a vehicle is rented in the company’s name",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "IDENTITY RESTORATION SERVICES",
  //   definition:
  //     "1st party coverage to offer not just the monitoring services for the affected individuals, but the restoration costs associated with getting an individuals identity back.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "IN HOUSE INCIDENT RESPONSE TEAM",
  //   definition:
  //     "Does the insure outsource their incident response team or do they have a team in house to handle things more efficiently.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "IN PRO PER",
  //   definition:
  //     "An injured worker or other party who is not represented by an attorney.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "INDEPENDENT CONTRACTOR",
  //   definition:
  //     "A professional who contracts with a client to provide his or her services to the client for a specific amount of time for a specific rate, typically under the IRS classification of a 1099 employee",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "INDUSTRIAL MEDICAL COUNCIL (IMC)",
  //   definition:
  //     "The state agency that certifies Qualified Medical Evaluators (QME) and issues Panel QME’s when there is a dispute with the treating doctor’s report. (see Panel QME.)",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "INFORMATION & ASSISTANCE UNIT (I&A)",
  //   definition:
  //     "A unit within DWC that provides information to all parties and informally resolves disputes.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "INLAND MARINE",
  //   definition:
  //     "Inland Marine Coverage is generally written to cover machinery and equipment that moves around from place to place or from job site to job site. The word “marine” is an old insurance term suggesting that the equipment “floats around from place to place.” Insurance terms are full of “old English” references. Inland Marine policies are written to provide broader coverage than that which is typically included under Basic Property insurance policies. The Entertainment and Construction industries often utilize Inland Marine coverage.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "INTERNATIONAL OR FOREIGN LIABILITY PROTECTION",
  //   definition:
  //     "A policy for an insured’s liability for foreign operations arising out of a permanent branch office, manufacturing facility, construction project, or other operation located in another country. The commercial general liability (CGL) policy provides coverage for incidental exposures—for example, when an executive who lives and works in the United States and occasionally travels overseas for business trips. For permanent operations in foreign countries, a separate foreign liability policy is required.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "KEY MAN INSURANCE",
  //   definition:
  //     "A life insurance policy protecting a corporation or business from the death of a key employee. Key man Insurance is often required by investors in a business where one or a small number of individual employees are key to the success of the venture.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "KEY PERSON LIFE",
  //   definition:
  //     "Life insurance owned by a business entity on the life of a key individual that will, in the event of his or her death, offset a loss in earnings and provide the funds necessary to find, hire, and develop a replacement. It is designed to offset losses resulting from the death of a key person, such as reduced sales, interruption of a vital research project, flow of production, or an impaired credit standing.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "LAPTOPS AND PDA’S",
  //   definition:
  //     "Protection for the insured in the event of a lost or stolen portable device with sensitive information stored on it.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "LIEN",
  //   definition:
  //     "A right or claim for payment against a workers’ compensation case.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "LIGHT DUTY",
  //   definition:
  //     "Temporary change in job assignment to accommodate work restrictions while you are healing. May or may not pay at the same rate as your normal work assignment. Lost wages may be partially made up by Temporary Partial Disability (TPD) payments.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "LIMIT OF LIABILITY PER OCCURRENCE",
  //   definition:
  //     "The maximum dollar amount the insurance company agrees to pay for any single loss.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "LITIGATED CLAIM",
  //   definition:
  //     "A workers’ compensation claim where an Application for Adjudication has been filed.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "MALWARE",
  //   definition:
  //     "Short for “malicious software,” malware refers to software programs designed to damage or perform actions on a computer system. Common examples of malware include viruses, worms, Trojan horses, and spyware. Viruses, for example, can wreak havoc on a computer’s hard drive by deleting files or critical data. Spyware can gather data from a user’s system without the user being aware. This can include anything from the web pages a user visits to personal information, such as credit card numbers or social security numbers.To help combat malware, users can install anti-virus and anti-spyware utilities on their computer that will seek and destroy the malicious programs they find. It is also useful to run updates as these often repair known flaws in software.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "MANDATORY SETTLEMENT CONFERENCE (MSC)",
  //   definition:
  //     "A required conference to discuss settlement of disputed issues prior to a trial.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "MEDIATION CONFERENCES",
  //   definition:
  //     "A voluntary conference held before an I & A Officer to resolve disputes for injured workers who are not represented by an attorney.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "MEDICAL TREATMENT",
  //   definition:
  //     "Treatment reasonably required to cure or relieve from the effects of a work-related injury or illness.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "MODIFIED WORK",
  //   definition:
  //     "A change in your working conditions in order to accommodate permanent work restrictions determined by your Primary Treating Physician when you have become Permanent and Stationary.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NEGLIGENCE",
  //   definition:
  //     "Failure to use that degree of care which an ordinary person of reasonable prudence would use under the given circumstances. Negligence may be constituted by acts either committed or omitted, or both.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NETWORK SECURITY",
  //   definition: "3rd party liability for breaches of security by hackers.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NON-DIGITAL MEDIA/CONTENT",
  //   definition:
  //     "3rd party liability coverage for content disputes through the insureds use of non-digital media.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NON-OWNED AUTO",
  //   definition:
  //     "Liability coverage an employer is exposed to when an employee is driving another employer’s auto or an employee’s personal auto.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NOTIFICATION COSTS",
  //   definition:
  //     "1st party coverage to pay for the notification of affected individuals in the event of a security breach suffered by the insured.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "NOTIFICATION OUTSIDE THE LIMIT",
  //   definition:
  //     "The sub-limit for Notification Costs would be outside the policy aggregate.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "OCCURRENCE COVERAGE",
  //   definition:
  //     "A policy providing coverage only for injury or loss that occurs during the policy period, regardless of when the claim is made. For example, a claim made after expiration of a policy would be covered if the injury or loss occurred during the time the policy was in force. (See Claims-Made Coverage for comparison.)",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "OFF-SITE STORAGE OF DATA",
  //   definition:
  //     "Protection for the insured if their data is lost or stolen while residing on a third party data storage vendor’s network.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "OFF-SITE STORAGE OF PAPER FILES",
  //   definition:
  //     "Protection for the insured in the event they lose sensitive data that is in paper format that is being stored at an off-site third party vendor location.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ORDER TAKING OFF CALENDAR (OTOC)",
  //   definition: "An order that places a WCAB case in an inactive status.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "OWNED AUTOS",
  //   definition:
  //     "Also known as Commercial Auto coverage, this policy can provide a combination of liability protection and physical damage coverage for loss due to damage to vehicles owned, maintained, or used by the Organization. Additional coverage such as underinsured motorist protection can be purchased to customize the policy.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PANEL QUALIFIED MEDICAL EVALUATOR",
  //   definition:
  //     "A list of three independent qualified medical evaluators issued by the state Industrial Medical Council. You select any one of the three doctors for your evaluation. This is for workers not represented by an attorney.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PAPER FILES",
  //   definition:
  //     "Protection for the insured in the event they lose sensitive data that is in paper format.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PARTY",
  //   definition:
  //     "Normally this includes you, the claims administrator, your employer, attorneys, and any other person who has an interest in your claim (for example, doctors or hospitals that have not been paid).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PCI FINES & PENALTIES",
  //   definition:
  //     "Protection for the insured in the event they are fined or penalized by the Payment Card Industry — Data Security Standards (PCI-DSS).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PERMANENT AND STATIONARY (P&S)",
  //   definition:
  //     "A term for describing when your medical condition has reached maximum medical improvement (MMI).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PERMANENT DISABILITY (PD)",
  //   definition:
  //     "Any residual disability that impairs your ability to compete in the open labor market after you become permanent and stationary.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PERMANENT DISABILITY ADVANCE (PDA)",
  //   definition:
  //     "A voluntary lump sum payment on permanent disability due in the future.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PERMANENT DISABILITY PAYMENTS",
  //   definition:
  //     "Mandatory bi-weekly payments on the undisputed portion of permanent disability, prior to or subsequent to an award.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PERMANENT DISABILITY RATING",
  //   definition:
  //     "The determination of your level of permanent disability based on a physician’s medical report.Ratings can be done by claims administrators, attorneys, independent raters or the Disability Evaluation Unit.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PETITION FOR RECONSIDERATION (RECON)",
  //   definition:
  //     "An appeal of a decision issued by a Workers’ Compensation Administrative Law Judge. It must be filed within 20 days of the judge’s final decision.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PHISHING",
  //   definition:
  //     "The term phishing originates from fishing in a lake, but instead of trying to capture fish, phishers attempt to steal personal information. They send out e-mails that appear to come from legitimate websites such as eBay, PayPal, or banks. The e-mails typically state that your information needs to be updated or validated and ask that you enter your username and password, after clicking a link included in the e-mail.\n\n Phishing is a deception that scammers use to collect personal information from unsuspecting users. The false e-mails often look legitimate, and even the Web pages where you are asked to enter your information may look real. However, the URL in the address field can tell you if the page you have been directed to is valid or not.\n\n A good strategy if you receive an e-mail that asks that you update your information and you think it might be valid, is to visit the website by typing the URL in your browser’s address field instead of clicking the link in the e-mail. For example, type in the company’s website into your browser and navigate to it directly. If you are prompted to update your information after you have typed in the Web address and logged in, then the e-mail was probably legitimate.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "POINT OF SERVICE (POS)",
  //   definition:
  //     "An option provided by some HMOs that allows covered persons to go outside the plan’s provider network for care, but requires they pay higher cost-sharing than they would for network providers.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "POLLUTION LIABILITY PROTECTION",
  //   definition:
  //     "A specialized insurance policy that covers liability and oftentimes cleanup costs associated with pollution.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PREDESIGNATED PHYSICIAN",
  //   definition:
  //     "A Primary Treating Physician that can initially treat you if you have advised your employer in writing prior to the industrial injury or illness. You must have seen the predesignated physician prior to selection.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PREFERRED PROVIDER ORGANIZATION (PPO)",
  //   definition:
  //     "A delivery system where providers are under contract to a carrier to provide care at a discount or for a fixed fee, and the carrier provides incentives to patients to use the contracting providers. The PPO does not assume insurance risk, and it does not facilitate the sharing of risk by its covered persons.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PRIMARY TREATING PHYSICIAN (PTP)",
  //   definition:
  //     "The doctor who has overall responsibility for treatment of your industrial injury or illness. There can only be one PTP at a time.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PRIVACY LIABILITY",
  //   definition:
  //     "3rd party liability for the accidental release of sensitive information",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PRODUCTS COMPLETED OPERATIONS",
  //   definition:
  //     "Coverage which protects against liability losses caused by the insured’s products or by operations completed by the insured",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PROFESSIONAL LIABILITY INSURANCE",
  //   definition:
  //     "Liability insurance protecting professionals for loss or expense resulting from claims of mistakes, errors or omissions committed or alleged to have been committed by the insured in his professional activities. Also covers holder against claims of libel, slander and invasion of privacy.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PROOF OF SERVICE",
  //   definition:
  //     "A form used to show that documents have been sent to specific parties.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PROPERTY OF OTHERS",
  //   definition:
  //     "Property under your care, custody or control which you do not own.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "PROPERTY OFF-PREMISES",
  //   definition: "Property which is not in your place of business.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "QUALIFIED INJURED WORKER (QIW)",
  //   definition:
  //     "An injured worker who is entitled to vocational rehabilitation benefits.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "QUALIFIED MEDICAL EVALUATOR (QME)",
  //   definition:
  //     "An independent physician certified by the Industrial Medical Council to perform medical evaluations.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "QUALIFIED REHABILITATION REPRESENTATIVE (QRR)",
  //   definition:
  //     "A vocational rehabilitation counselor, either independent or from the insurance company.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "RANSOMWARE",
  //   definition:
  //     "Ransomware is a type of malware that prevents you from using your computer or accessing files unless you pay a ransom. It often encrypts files so that they cannot be opened. Ransomware is often distributed as a trojan, or malware disguised as a legitimate file. Once installed, it may lock your computer and display a lock screen with a message saying you must pay a ransom to regain use of your computer. The ransom message typically includes instructions for how to pay the ransom, often by credit card or digital currency, bitcoin. Ransom amounts range from less than $100 to thousands of dollars. Some ransomware may allow you to use your computer, but will prevent you from opening files. When you try to open a file or directory encrypted by the ransomware, you may see a message saying your files are being held for ransom and you must pay a ransom to regain access to them. The best strategy against ransomware is prevention. Don’t open unknown files or downloads from untrusted websites. You may also want to install antivirus or Internet security software that can detect and eliminate ransomware threats before they take over your computer.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "REGULATORY DEFENSE & PENALTIES",
  //   definition:
  //     "Protection for the insured in the event they are fined or penalized by a governing body (example: HIPAA, HiTech, GLB).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "REHABILITATION UNIT",
  //   definition:
  //     "A unit within DWC that administratively resolves vocational rehabilitation disputes.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "RESERVATION OF RIGHTS",
  //   definition:
  //     "When a claim is turned in, typically involving professional liability, general liability, Employment related liability, or Directors & Officers liability, the insurance carrier confirms receipt of the claim. Sometimes the confirmation of receipt is sent on what is called a reservation of right letter. The purpose is to assure the policyholder that the carrier has received the claim notification, but that they have not yet determined if the policy will respond to certain or any specific aspects of the claim, as presented. Receipt of the letter means that a process of fact discovery has begun by your insurance carrier. When you receive a letter of this type, it’s always best to collaborate with your insurance broker and to then follow up regularly to be certain that any questions that the carrier claim adjuster poses are answered quickly and accurately.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "RETROACTIVE DATE",
  //   definition:
  //     "Date on a claims-made policy which triggers the beginning period of coverage prior to the effective date. A retroactive date is not required. If one is shown on the policy, any claim made during the policy period on a loss that occurred before the retroactive date will not be covered.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "ROGUE EMPLOYEE COVERAGE",
  //   definition:
  //     "Protection for the innocent insured in the event a data breach was the result of a dishonest employee. Does not include acts by owners/officers.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SECTION 125 PLAN",
  //   definition:
  //     "A plan in compliance with Section 125 of the IRC, which protects an employee from constructive receipt of the cash he or she has, as a choice of benefits under a cafeteria plan. This means that employee contributions to a Section 125 plan may be made with pre-tax dollars.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SELF FUNDING",
  //   definition:
  //     "When a business funds a benefit plan from its own resources rather than purchasing insurance. The employer assumes the risk of expected claims. With stop-loss insurance, the employer’s costs are capped at a certain level. A minimum number of employees is necessary to have an acceptable spread of risk, and cash reserves need to be adequate to meet the up front stop-loss deductible.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SERIOUS AND WILLFUL MISCONDUCT (S&W)",
  //   definition:
  //     "A petition filed if the injury is caused by the serious and willful misconduct of the employer or the injured worker.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SETTLEMENT",
  //   definition:
  //     "A workers’ compensation cases may be settled in one of two ways, by a Compromise and Release (C&R) or by a Stipulation with Request for Award (Stip). A C&R usually settles all outstanding issues in a claim for a single lump sum payment. A Stipulation may leave certain issues open, such as future medical treatment and/or vocational rehabilition.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SOCIAL ENGINEERING",
  //   definition:
  //     "Coverage when the insured suffers a loss of money because of spear phisihing scam which dupes an employee of the insured into wire funds transferring money to a third party.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SOCIAL ENGINEERING ATTACK",
  //   definition:
  //     "A social engineering attack, as it relates to computer security, refers to tricking people into divulging personal information or other confidential data. It is an umbrella term that includes phishing, pharming, and other types of manipulation. Unlike hacking, social engineering relies more on psychological manipulation than technical knowledge. For example, a malicious user may send you a “phishing” email that says you need to reset your username and password for a specific website. The email may appear to be legitimate, but if you click the link in the message, it may direct you to a fake website that captures your information. Another common type of social engineering uses false alerts on websites. For example, when you open a webpage, you might receive a message saying your computer has a virus and you need to download a specific program or call a phone number to fix it. In most cases, these alerts are auto-generated and are completely false. If you follow the instructions in the alert message, you may end up downloading spyware or giving away personal information over the phone. Social engineering may also take place through social media. For example, malicious users may post public messages on sites like Facebook and Twitter that entice people into sharing personal information. Common example include phony giveaways and prizes. In some cases, social engineers will even build relationships with others using online chat or private messaging before convincing them to divulge confidential data. While most Internet users do not harbor malicious intent, social engineering is an unfortunate reality of the Internet. Therefore, it is wise to be wary of any message, email, or website that asks you to share personal data — especially if the request is from an unknown source. You can often verify the legitimacy of a message by checking the domain name of the website. If you cannot verify the origin of a request, do not follow the instructions.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SOCIAL ENGINEERING AUTHENTICATION REQUIREMENT",
  //   definition:
  //     "Is There a provision in the policy in which social engineering coverage only applies to insureds who provide a means of verification that the wire funds transfer is legitimate before sending the money.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "STATE DISABILITY INSURANCE (SDI)",
  //   definition:
  //     "A branch of the Employment Development Department that pays temporary disability benefits for non-industrial injuries or illnesses.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "STIPULATION WITH REQUEST FOR AWARD (STIP)",
  //   definition:
  //     "A settlement where the parties agree on the terms of an award. It may include any future medical treatment. Payment takes place over time.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SUBPOENA",
  //   definition:
  //     "A document that requires a witness to appear at a hearing. There must be an Application for Adjudication on file for a subpoena to be valid.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SUBPOENA DUCES TECUM (SDT)",
  //   definition:
  //     "A document that requires records be sent to the requester. There must be an Application for Adjudication on file for a subpoena duces tecum to be valid.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SUMMARY RATING",
  //   definition:
  //     "The percentage of permanent disability calculated by the DWC Disability Evaluation Unit based on either the Primary Treating Physician or a Panel QME. This type of rating is only available for workers not represented by an attorney.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "SUMMARY RATING RECONSIDERATION",
  //   definition:
  //     "An administrative procedure to object to the Summary Permanent Disability Rating issued by the DWC Disability Evaluation Unit. The request must be made within 30 days of receipt of the summary rating.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TELECOMMUNICATIONS FRAUD COVERAGE",
  //   definition:
  //     "Telecommunications Fraud is the use of a telecoms system without the intent to pay. The loss often arises from fraudulent call transferring or the diversion of premium numbers to a network leaving the subscriber of such network with large bills, often running into many thousands in cost.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TELEPHONE HACKING",
  //   definition:
  //     "1st party coverage for the insured in the event of their telephone system being hacked by a third party including the cost of unauthorized calls",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TEMPORARY DISABILITY (TD) OR TEMPORARY TOTAL DISABILITY (TTD)",
  //   definition:
  //     "A wage replacement benefit paid when your physician reports you cannot work because of an industrial injury or illness.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TEMPORARY PARTIAL DISABILITY (TPD)",
  //   definition:
  //     "A wage replacement benefit that may be paid when you return to work but at less than full earnings. Sometimes referred to as Wage Loss.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "THIRD PARTY ADMINISTRATOR (TPA)",
  //   definition:
  //     "An organization that performs managerial and clerical functions related to an employee benefit insurance plan by an individual or committee that is not an original party to the benefit plan.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TRANSMISSION OF VIRUS",
  //   definition:
  //     "Protection for the insured in The event they accidentally transmit a virus to a 3rd party.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "TRANSPORTATION EXPENSES",
  //   definition:
  //     "A benefit to cover your out-of-pocket expenses for mileage, parking, and toll fees related to a claim, usually a reimbursement.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "UMBRELLA LIABILITY POLICY",
  //   definition:
  //     "A liability policy designed to provide liability protection above and beyond that provided by standard policies.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "UNINSURED EMPLOYERS FUND (UEF)",
  //   definition:
  //     "If your employer is illegally uninsured, this fund may provide benefits to you.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "VALUABLE PAPERS AND RECORDS INSURANCE",
  //   definition:
  //     "Provides coverage for the replacement of valuable papers, records and forms, including electronic media.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "VANISHING DEDUCTIBLE",
  //   definition:
  //     "Once an insured pays their policy’s deductible for their first incident in a policy period, there is no more deductible on future claims.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "VIRUS LIABILITY ENDORSEMENT",
  //   definition:
  //     "Provides coverage for the loss of data or replacement costs for hardware and software damaged by a computer virus; written as an added coverage on a Professional Liability policy. This endorsement also covers claims arising by unauthorized access to a system.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "VOCATIONAL REHABILITATION",
  //   definition:
  //     "This benefit assists qualified injured workers in returning to work.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WAGE LOSS",
  //   definition:
  //     "Temporary disability benefits that may be paid when an employee returns to work at less than full earnings. Also, known as Temporary Partial Disability (TPD).",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WORK SITE PRODUCTS",
  //   definition:
  //     "Supplementary benefits, with premiums paid either by the employer or through payroll deduction, including Cancer insurance, Accidental Death and Dismemberment, Section 125, Hospital Indemnity Plans, Medical Reimbursement Programs, etc.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WORKER’S COMPENSATION",
  //   definition:
  //     "Provides medical and disability coverage for on-the-job injuries or work related injuries; Also provides Employer’s Liability coverage, protecting the company from an injured employee’s claim that the employer’s negligence was the cause of the employee’s injury.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WORKERS’ COMPENSATION ADMINISTRATIVE LAW JUDGE",
  //   definition:
  //     "Judges at DWC district offices that conduct hearings, take evidence, issue decisions, and approve settlements.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WORKERS’ COMPENSATION APPEALS BOARD (WCAB)",
  //   definition:
  //     "The judicial unit that formally resolves workers’ compensation disputes.",
  //   glossaryType: "Business",
  // },
  // {
  //   term: "WORKERS’ COMPENSATION COVERAGE",
  //   definition:
  //     "Protects against employee injuries at work by paying certain compensation and medical care for injured workers. It is often required by the state that employers obtain this coverage for all employees. This is separate and different from Health Insurance!",
  //   glossaryType: "Business",
  // },
  {
    term: "AIRCRAFT INSURANCE",
    definition:
      "Aircraft coverage may protect you in the event that certain negligent acts and/or omissions result in losses in connection with the use, ownership, or maintenance of aircraft.",
    glossaryType: "Personal",
  },
  {
    term: "ANTIQUES, ART AND JEWELRY INSURANCE",
    definition:
      "Also known as a Personal Articles Floater, this type of coverage is typically added to a Homeowners Policy. Items such as jewelry, collectibles, fine arts, and rare books which can be specifically described and listed for an insured amount. Coverage for these items is generally restricted under a Homeowners Policy, so the Personal Articles Floater is important to fill the gap in coverage for these items.",
    glossaryType: "Personal",
  },
  {
    term: "AUTO INSURANCE",
    definition:
      "Coverage on the risks associated with driving or owning an automobile. It may include collision, liability, comprehensive, medical, and uninsured/underinsured motorist coverages.",
    glossaryType: "Personal",
  },
  {
    term: "BOAT INSURANCE",
    definition:
      "Boat coverage may protect you if you injure someone with your boat or damage their property. Boat liability coverage typically provides protection for legal liability because of an accident resulting from the ownership, maintenance, or use of your watercraft, including bodily injury, property damage, and legal defense.",
    glossaryType: "Personal",
  },
  {
    term: "BRUSH AREA SUPPLEMENTAL INSURANCE",
    definition:
      "Homes located in brush areas have a higher risk of fire damage, so a stand alone Homeowners Policy isn’t usually enough. There is a special coverage known as either, DIC (Difference in Conditions), Gap Filler, or Wrap Coverage that is used. DIC insurance is designed to increase coverage for perils that can result in severe losses, such as brush fires, floods, earthquakes, and other catastrophes. It is designed to provide coverage that the broader insurance market shies away from.",
    glossaryType: "Personal",
  },
  {
    term: "EARTHQUAKE INSURANCE",
    definition:
      "Earthquake coverage is typically excluded (along with other earth movement) from most homeowner’s insurance policies.",
    glossaryType: "Personal",
  },
  {
    term: "FLOOD INSURANCE",
    definition:
      "Flood coverage is typically excluded (along with other earth movement) from most homeowner’s insurance policies.",
    glossaryType: "Personal",
  },
  {
    term: "FULL-TIME-DOMESTIC EMPLOYEES INSURANCE",
    definition:
      "Also known as Inservant/Outservant coverage, this type of coverage is essential if you have Full Time employees working in or outside your home. A Full Time Inservant is defined as a person employed to work for another, especially one who performs household duties and who works for 20 hours or more per week. A Full Time Outservant is defined as a domestic servant whose principal duties are outside, such as a gardener or chauffeur, and who works 10 hours or more per week.",
    glossaryType: "Personal",
  },
  {
    term: "HOMEOWNERS INSURANCE",
    definition:
      "A package insurance policy providing property and liability coverages tailored to the needs of most home owners and condominium owners. Various versions are available depending on the type of dwelling insured and the scope of protection to be covered. They typically include Dwelling coverage to repair or rebuild your home, Personal Property coverage if personal items are damaged or destroyed, Loss of Use coverage for additional housing costs should you need to live outside of your home as it’s being repaired, and Liability coverage which helps protect your assets and cover your defense costs in the event of certain lawsuits.",
    glossaryType: "Personal",
  },
  {
    term: "MOTORCYCLE INSURANCE",
    definition:
      "Motorcycle insurance is designed for two- and three-wheeled vehicles licensed for use on public roads, such as; Factory-built motorcycles, Classic motorcycles, Custom motorcycles, Motor scooters, Minibikes, and Trail bikes",
    glossaryType: "Personal",
  },
  {
    term: "RENTAL PROPERTIES INSURANCE",
    definition:
      "Rental property coverage often includes Dwelling Fire coverage. Dwelling Fire is a narrow type of dwelling coverage which only helps protect against perils specifically named in the policy. Typically, this type of coverage only helps protect against claims arising from fire damage.",
    glossaryType: "Personal",
  },
  {
    term: "RV (RECREATIONAL VEHICLE) INSURANCE",
    definition:
      "There are two types of RV insurance, Full-time and Recreational. Full-time RV insurance is designed for if you live in your RV (meaning it’s your primary residence for at least 6 months out of the year). Recreational is designed for if you don’t (typically doesn’t matter how many times you use your RV, as long as it’s not your primary residence).",
    glossaryType: "Personal",
  },
  {
    term: "RV/AIRCRAFT/MOTORCYCLE/BOAT INSURANCE",
    definition:
      "Insurance coverage for various types of vehicles beyond standard automobiles, including recreational vehicles, aircraft, motorcycles, and boats. The coverage options and requirements can vary significantly depending on the type of vehicle.",
    glossaryType: "Personal",
  },
  {
    term: "UMBRELLA POLICY",
    definition:
      "Also known as Excess Liability coverage provides an insured with an additional layer of liability coverage limits in addition to the limits provided under a homeowners or vehicle liability policy. The option of an additional layer of Uninsured / Underinsured Motorist coverage is also available.",
    glossaryType: "Personal",
  },
];

export default terms;
