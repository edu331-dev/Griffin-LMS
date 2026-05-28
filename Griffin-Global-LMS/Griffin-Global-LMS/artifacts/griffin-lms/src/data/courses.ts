import type { Course } from "../types/lms";

export const COURSES: Record<string, Course> = {
  "rising-stars": {
    id: "rising-stars",
    title: "Rising Stars Programme",
    tagline: "The spearheading programme",
    description: "Onboarding and professional foundation for new joiners at Griffin Global Technologies.",
    icon: "fa-star",
    color: "griffin",
    status: "active",
    estimatedHours: 12,
    introduction: {
      title: "Programme Introduction",
      items: [
        {
          id: "intro-welcome",
          type: "video",
          title: "Introduction Video",
          description: "Welcome from Griffin Global Technologies leadership and an overview of what the Rising Stars programme covers.",
          video: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=LMS_General_Intro_Video_1_znld0s",
          duration: "5 min"
        },
        {
          id: "intro-qa",
          type: "video",
          title: "Q & A Videos",
          description: "Frequently asked questions answered by people across the organization.",
          video: "",
          duration: "8 min"
        },
        {
          id: "intro-navigation",
          type: "video",
          title: "Platform Navigation Tutorial",
          description: "How to use the learning platform end to end: dashboard, modules, quizzes, and your verified badge.",
          video: "",
          duration: "12 min",
          isExternalReference: true
        }
      ]
    },
    modules: [
      {
        id: "module-1",
        number: 1,
        title: "Company Orientation",
        icon: "fa-building",
        introVideo: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Module_One_Intro_Video_1_ahqdhg",
        introDescription: "Your orientation to Griffin Global Technologies: the company's story, the values that guide every decision, the employee handbook you'll rely on, the professional standards expected of every employee, and how teams actually work together. Finish this module and you'll know who Griffin is and how to plug in from day one.",
        subtopics: [
          {
            id: "m1-s1",
            title: "Company Overview",
            category: "culture",
            icon: "fa-globe",
            presentation: { pdf: "/slides/company-overview.pdf", duration: "8 min" },
            content: {
              estimatedDuration: 12,
              sections: [
                {
                  heading: "Where We Began",
                  text: "Griffin Global Technologies — Professional Services is a technology firm based in Nyeri, Kenya, founded in April 2020. The organisation was established on an idea by Matt Turner, Managing Partner of THH, LLC, a technology firm located in Alpharetta, Georgia, USA. Professional Services was founded with a singular purpose: to impact the lives of people in Kenya by creating meaningful opportunities to grow, thrive, and give back to their communities. The organisation began in 2020 with just three employees, supported by two individuals from GRIFFIN. From that foundation, three distinct areas were established — Technology, Professional Services, and Training — which together form what is now GRIFFIN Global Technologies.",
                  audioText: "Griffin Global Technologies Professional Services is a technology firm based in Nyeri, Kenya, founded in April 2020. It was established on an idea by Matt Turner of THH LLC in Alpharetta, Georgia. Founded to impact lives in Kenya, it began with three employees and grew into three areas: Technology, Professional Services, and Training."
                },
                {
                  heading: "How We Operate",
                  text: "Today, GRIFFIN Global Technologies brings together our US and Kenya teams in one unified operation, supporting clients across a broad range of professional services. We are now approximately 250 people strong — all connected under the griffinglobaltech.com domain. Our structure has two main pillars. First, the GRIFFIN Global Technologies Professional Services division: it works with US and Kenya teams in full collaboration, supports clients across helpdesk, accounting, customer service and other back-office roles, has approximately 55 people, and all staff operate under griffinglobaltech.com email addresses. Second, the Customer Service Bootcamp: a separate not-for-profit entity within the GGT family, focused on real-world training for gainful employment, delivering personalised mentorship for students, and providing a pipeline of work-ready talent into the GGT ecosystem.",
                  audioText: "Today, Griffin Global Technologies has approximately 250 people across US and Kenya teams under griffinglobaltech.com. The Professional Services division has about 55 people across helpdesk, accounting, and customer service. The Customer Service Bootcamp is a separate not-for-profit providing training and a talent pipeline into the GGT ecosystem."
                },
                {
                  heading: "Your Nyeri Leadership Contacts",
                  text: "It helps to know who leads the Nyeri operation from day one. Aaron Etler is the GRIFFIN Global Technologies Nyeri Lead — you can reach him at aaron.ertler@griffinglobaltech.com or 0768 761353. Jerioth Waruru is the Professional Services Nyeri Lead — reachable at jerioth.waruru@thejitu.com or 0708 784579. For all people and HR matters, Carol Mwangi is the HR and Operations Leader — carol.mwangi@griffinglobaltech.com or 0722 242770. These are your first points of contact for leadership guidance and human resources questions as you settle in.",
                  audioText: "Know your Nyeri contacts. Aaron Etler is the Griffin Global Technologies Nyeri Lead. Jerioth Waruru is the Professional Services Nyeri Lead. Carol Mwangi is the HR and Operations Leader. These are your first points of contact for leadership and HR questions."
                },
                {
                  heading: "Our Culture and Values",
                  text: "At GGT, culture is not a poster on the wall — it is how we show up every single day. Our culture is demonstrated through fourteen values and attributes that every team member is expected to embody: Predictable Delivery — we consistently achieve outcomes on time so stakeholders can depend on us. Accountability — we take full responsibility for our actions and outcomes. Talent — we cherish talent irrespective of race, gender, age, nationality, or creed. Innovation — we design innovative solutions mindful of cost, technology, and time. Honesty — we operate with integrity in all interactions. Communication — we communicate clearly, proactively, and with purpose. Team Collaboration — we achieve far more together than apart. Punctuality — we respect each other's time without exception. Quality — we hold ourselves to consistently high standards. Oneness — we are united across all teams and geographies. Growth — we invest in continuous professional development. Going Beyond Expectations — we consistently exceed what is asked of us. Whatever It Takes — we are committed to finding a way. Wellness — we actively support each other's physical and mental wellbeing.",
                  audioText: "At GGT, culture is how we show up every day. Our fourteen values are: Predictable Delivery, Accountability, Talent, Innovation, Honesty, Communication, Team Collaboration, Punctuality, Quality, Oneness, Growth, Going Beyond Expectations, Whatever It Takes, and Wellness. These guide how we work, treat each other, and serve our clients."
                },
                {
                  heading: "Our Clients and Projects",
                  text: "The GRIFFIN Global Technologies Professional Services team currently hosts 11 clients across 18 active projects, spanning a diverse range of industries. Here is a full view of our clients and their active projects: Outback Deck — Finance & Operations, Deck Metrics, Marketing & Content Creation. Franklin Street — Marketing & Content Creation. Fortune Johnson — Data Analysis. A Closer Look — Market Care & Scheduling Department. Mariner Logistics — Invoice Audit, Track & Trace, Application Support. Cerebri AI — Appointment Scheduling, AIQ Agents. Tile Redi — Support Services. Unlocked Kingdom — Customer Service & Sales. Take Off Partners — Bids Estimation & Sales Teams. CoinFlip — Customer Support Team. Centerpoint — IT Support. Aldridge Pite — Legal Claims. Doeren Mayhew — Cost Segregation. The work ranges from finance and operations, data analysis, and invoice audit to customer service, sales, IT support, legal claims, and cost segregation — reflecting the depth and breadth of our team's capabilities.",
                  audioText: "Our Professional Services team hosts 11 clients across 18 active projects. Clients include Outback Deck, Franklin Street, Fortune Johnson, Mariner Logistics, Cerebri AI, Tile Redi, Unlocked Kingdom, CoinFlip, Aldridge Pite, and Doeren Mayhew. Work spans finance, data analysis, customer service, IT support, legal claims, and cost segregation."
                },
                {
                  heading: "General Expectations",
                  text: "As a member of the GGT team, you are expected to uphold the following standards from day one. These are not suggestions — they are the foundation of how we operate and how we serve our clients. Maintain consistency in your work schedule at all times. Aim for 100% attendance; communicate swiftly with your team lead in any emergency. Adhere fully to all company policies, standards, and procedures. Take care of all company resources and assets when handling them. Maintain a high level of discipline and professionalism in all interactions. Uphold good grooming standards — your appearance reflects the GGT brand. Log your time daily — integrity is not negotiable. Be available and punctual for all scheduled meetings. Communicate proactively on blockers, illness, or any unavailability — do not go silent. Karibu sana — welcome to the GGT family. You are now part of a team making a real difference in the lives of our clients, our colleagues, and the communities we serve.",
                  audioText: "From day one, uphold GGT standards: maintain a consistent schedule, aim for full attendance, follow all policies, care for company assets, stay disciplined and professional with good grooming. Log your time daily, be punctual for meetings, and never go silent on blockers or illness. Karibu sana — welcome to the GGT family."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "A new employee tells a friend that GGT only works with Kenyan clients. What is the right course of action?",
                  options: [
                    "The error is minor since most clients are likely Kenyan anyway; no correction needed",
                    "Represent the company accurately — misrepresenting GGT externally damages trust and reputation",
                    "Avoid discussing work outside the office to prevent confusion",
                    "Trust the friend will find the correct details online later"
                  ],
                  correct: 1,
                  explanation: "Accurate representation is foundational. Every employee acts as an ambassador and the Company Overview exists so staff describe GGT correctly. Misstatements compound, even casual ones."
                },
                {
                  q: "A new hire skips the cultural values session and is later flagged for repeated lateness and missing weekly reports. How do GGT's culture expectations apply?",
                  options: [
                    "The lateness and missed reports are unrelated to the skipped session — treat them as isolated issues",
                    "Excuse the hire since they were never formally walked through the rules",
                    "The behaviour breaches GGT's culture expectations on punctuality and accountability — coach the hire, reset standards, and complete onboarding",
                    "Issue a final warning immediately for cultural non-compliance"
                  ],
                  correct: 2,
                  explanation: "Culture is not a session you can skip. Punctuality and reporting are stated expectations, not preferences. Treat both the root cause and the symptoms together."
                },
                {
                  q: "An employee assumes the Customer Service Bootcamp has no connection to their work. What is the correct understanding?",
                  options: [
                    "The Bootcamp is entirely separate; the assumption is correct",
                    "The Bootcamp feeds talent into GGT's Professional Services arm — every employee benefits from understanding this pipeline and reinforcing GGT's social mission",
                    "The Bootcamp should be ignored unless the employee is part of recruitment",
                    "The two entities should operate entirely separately to avoid conflict of interest"
                  ],
                  correct: 1,
                  explanation: "The Bootcamp and Professional Services are deliberately linked. Alumni become colleagues and clients see GGT's social mission as part of its identity."
                },
                {
                  q: "A client-facing employee cannot answer a technical question during a call and is unsure who to contact. What is the appropriate response?",
                  options: [
                    "Tell the client GGT does not handle that question and end the call",
                    "Place the client on hold indefinitely until someone walks past",
                    "Acknowledge the question, commit to a clear follow-up timeline, and use the leadership and HR escalation contacts in the Company Overview to route the query internally",
                    "Guess at an answer during the call and correct it later"
                  ],
                  correct: 2,
                  explanation: "Client trust is preserved by honest acknowledgement plus a clear escalation path. The Company Overview names the contacts for exactly this purpose."
                },
                {
                  q: "A team member has a personal issue affecting their work and is hesitant to speak to their direct manager. Based on the Company Overview, what should they do?",
                  options: [
                    "Keep the matter quiet and hope it resolves on its own",
                    "Bypass HR entirely and raise the issue directly with senior leadership",
                    "Approach the HR contacts listed in the Company Overview — knowing alternative escalation paths protects employees when the direct manager is not the right first channel",
                    "Resign rather than have an uncomfortable conversation"
                  ],
                  correct: 2,
                  explanation: "Employees need multiple safe channels, especially when the manager is part of the issue. The HR contacts in the Company Overview provide exactly that alternative path."
                }
              ]
            }
          },
          {
            id: "m1-s2",
            title: "Company Values and Mission Alignment",
            category: "culture",
            icon: "fa-bullseye",
            presentation: {
              pdf: "/slides/organizational-alignment.pdf",
              duration: "9 min"
            },
            content: {
              estimatedDuration: 14,
              sections: [
                {
                  heading: "What Culture and Alignment Mean",
                  text: "A culture is how things are done in a particular environment — the shared values, behaviours, attitudes, and working style that shape how employees interact, make decisions, and treat customers. Organisational culture is like the company's internal compass; it is influenced by beliefs and assumptions drawn from what we hear, observe, and learn. To succeed at GGT, we all need to adapt to and align with our culture. This is not a passive process — it is an active, daily commitment. Culture alignment means understanding not just what the values are, but applying them in every decision, every interaction, and every deliverable.",
                  audioText: "Culture is how things are done: the shared values, behaviours, and attitudes that shape how we work and treat customers. At GGT, alignment is an active daily commitment. To succeed, understand each value and apply it in every decision, interaction, and deliverable."
                },
                {
                  heading: "Accountability",
                  text: "Accountability is the obligation to take responsibility for one's actions and decisions, and to be answerable to others for outcomes. It matters because it builds trust between parties, strengthens relationships, and ensures there are no surprises in service delivery. We achieve accountability by using structured reporting tools such as KPIs, status reports, the RUM customer tracker, agile meetings, ticket systems, financial reports, and regular team meetings. We also achieve it by setting and aligning expectations early, taking full ownership of tasks, decisions, and outcomes, and by maintaining clear, open communication. Importantly, accountability should be objective — not based on feelings or assumptions. It must be visible, documented, and verifiable.",
                  audioText: "Accountability is the obligation to take responsibility for actions and outcomes. Build it through KPIs, status reports, trackers, and ticket systems. Set expectations early, take ownership, and maintain clear communication. Accountability must be objective, visible, and documented — not based on feelings."
                },
                {
                  heading: "Accountability in Day-to-Day Operations",
                  text: "From the moment you clock in to when you clock out, several practices are mandatory. Wear your badge at all times within the building. Sign the security register with your entry and exit times. Clock in and out via the Microsoft Forms and Teams daily reporting channel. Use the official project Teams channel for daily reports and to communicate breaks or unavailability. Submit a weekly report every Friday covering completed tasks, pending items, and any concerns or blockers. Keep your Time Entry System (TES) updated at all times. Maintain cleanliness in shared spaces, attend all work events punctually, and follow all SOPs strictly. These practices are not optional — they form the visible proof of your accountability.",
                  audioText: "Daily accountability practices are mandatory: wear your badge, sign the security register, clock in and out via Microsoft Forms and Teams, use the official project channel for daily reports, submit a weekly report every Friday, and keep your Time Entry System updated. These practices are the visible proof of your accountability."
                },
                {
                  heading: "Predictable Delivery",
                  text: "We are dedicated to the principle of 'No Surprises' — delivering high-quality solutions that surpass client expectations. Predictable delivery means the consistent and reliable achievement of outcomes on time and as expected, so stakeholders can always depend on agreed results. We maintain predictability by ensuring a clear understanding of expectations from the start, communicating as early as possible whenever we see a risk to agreed outcomes, following a consistent delivery model, and remaining accountable within the team at all times. What is not a surprise? Emergency leave due to genuine illness, an agreed scope change made formally, or a nationally declared holiday. Everything else that causes a client or stakeholder to be unexpectedly impacted must be treated as something to communicate proactively.",
                  audioText: "Predictable delivery means No Surprises: consistently achieving outcomes on time so stakeholders can depend on agreed results. Communicate risks early, follow a consistent delivery model, and stay accountable. Emergency leave due to illness or agreed scope changes are not surprises — everything else that unexpectedly impacts stakeholders must be communicated proactively."
                },
                {
                  heading: "Innovation",
                  text: "We thrive on designing innovative solutions that address customer needs, always mindful of cost, technology, and time. Innovation at GGT is disciplined, not reflexive. The first step is always to agree on the objectives and the business and technical requirements for every project. Customer objectives often include increasing sales, improving operational efficiency, reducing risk, and saving money. When analysing an emerging technology, we weigh its costs such as licensing and implementation, its complexity and training requirements, its measurable benefits, and any comparable technology that already exists in the stack. Innovation means using what exists first, identifying the actual gap clearly, and only then proposing new investment with a solid business case.",
                  audioText: "Innovation at GGT is disciplined, not reflexive. First agree on objectives and requirements. When evaluating technology, weigh costs, complexity, training needs, benefits, and comparable existing tools. Use what exists first, identify the gap clearly, then propose new investment with a solid business case."
                },
                {
                  heading: "Talent",
                  text: "We cherish talent irrespective of race, gender, age, nationality, or creed. Talent refers to all individuals who support our business, including our employees, customer teams, and vendor teams. We value talent because it is the foundation of organisational success — it drives innovation, enhances productivity, and enables long-term sustainability through skilled and motivated people. We identify and improve talent by attracting the right skills through structured interviews, investing in continuous learning and professional development, fostering mentorship and knowledge sharing across teams, and consistently recognising and rewarding strong performance and demonstrated potential. Underperformance must be addressed early, directly, and with a clear improvement plan — leaving it unaddressed fails the individual, the team, and our clients.",
                  audioText: "We cherish talent regardless of race, gender, age, nationality, or creed. Talent includes all employees, customer teams, and vendor teams and is the foundation of organisational success. Attract the right skills, invest in continuous learning, foster mentorship, and recognise performance. Underperformance must be addressed early and directly — leaving it unaddressed fails everyone."
                }
              ]
            },
            practical: {
              video: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Organizational_Alignment_alqc0e",
              duration: "9 min"
            },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "A data analyst discovers a system error on Sunday evening that will affect Monday's client report. She waits to see if it resolves itself. By 9 a.m. Monday the client emails asking for the report. Which GGT values were breached?",
                  options: [
                    "No values were breached; the issue was technical, not personal",
                    "Predictable Delivery and Accountability were both breached — she should have flagged the issue immediately, informed the client proactively, and proposed a revised timeline",
                    "The client should have been more patient given the system error",
                    "She should have published the report with placeholder data and corrected it afterwards"
                  ],
                  correct: 1,
                  explanation: "Predictable Delivery is about telling stakeholders early when something is at risk, not hoping it resolves itself. Accountability is about owning that disclosure even when uncomfortable."
                },
                {
                  q: "A new team member completes a task but does not log it in the tracking system because they felt the result spoke for itself. The team lead later cannot confirm task status during a client sync. Which values were violated?",
                  options: [
                    "Only an admin oversight; values are not affected",
                    "Accountability and Predictable Delivery were violated — without a logged status, the team cannot represent itself accurately to the client, eroding trust regardless of whether the work was done",
                    "The team lead should have remembered the status without needing the log",
                    "The system should auto-log work; the employee is not at fault"
                  ],
                  correct: 1,
                  explanation: "A task that isn't logged is invisible to the team. The values cover not just the work itself but the reporting trail that makes work visible and trustworthy to clients."
                },
                {
                  q: "A sales team immediately requests budget for a new AI tool to improve lead conversion, without first reviewing what their CRM already supports. The CRM features could have achieved the same result at no cost. How does this reflect on GGT's Innovation value?",
                  options: [
                    "Innovation means buying the newest tools; the sales team acted correctly",
                    "The team confused Innovation with novelty — GGT's Innovation value calls for using what exists first, identifying the actual gap, and only then proposing new investment with a clear business case",
                    "The team should never propose new tools",
                    "Innovation only applies to engineering teams"
                  ],
                  correct: 1,
                  explanation: "Innovation at GGT is disciplined, not reflexive. The first move is to understand what current tools can do. New investment follows a clear gap and a business case, not the appeal of a new product."
                },
                {
                  q: "A team lead is aware that a team member is consistently underperforming but avoids raising it to sidestep an uncomfortable conversation. Three months later, client deliverables begin to suffer. Which values has the lead failed?",
                  options: [
                    "The lead was being kind; avoidance is acceptable in difficult cases",
                    "Accountability and Talent were both failed — underperformance should be addressed early through direct, structured feedback and a clear improvement plan, protecting both the individual and client outcomes",
                    "The underperforming team member is the only one responsible",
                    "The lead should have escalated to HR before any conversation with the team member"
                  ],
                  correct: 1,
                  explanation: "Talent is developed through honest, timely feedback. Accountability requires the lead to act when delivery is at risk. Three months of avoidance damages the team member, the client, and the lead's credibility."
                },
                {
                  q: "An employee receives positive feedback from a client and shares a screenshot of the email on their personal LinkedIn, tagging the client's company. Management receives a complaint about confidentiality. Which values and policies were violated?",
                  options: [
                    "Sharing positive feedback is good visibility for the company",
                    "The employee violated client confidentiality and external communications policy — recognition involving clients should be routed through internal channels first and shared externally only with explicit client and management approval",
                    "The client overreacted; no real harm was done",
                    "Personal social media is outside the company's reach"
                  ],
                  correct: 1,
                  explanation: "Client information, including praise, belongs to the client relationship first. External sharing without approval is a confidentiality breach. The right path is internal recognition first, then external sharing only with explicit consent."
                }
              ]
            }
          },
          {
            id: "m1-s3",
            title: "GGT Employee Handbook",
            category: "technical",
            icon: "fa-book-open",
            presentation: {
              video: "",
              pdf: "/slides/employee-handbook.pdf",
              duration: "10 min"
            },
            content: {
              estimatedDuration: 16,
              sections: [
                {
                  heading: "Introduction, Scope and Equal Opportunity",
                  text: "The Employee Handbook applies to all employees engaged by The Jitu BPO, a division of The Jitu Limited, based in Nyeri or working off-site on behalf of The Jitu in Kenya. The policies in this handbook set out the rules that govern your employment. Failure to comply may lead to disciplinary action, including dismissal in serious cases or where there is no improvement after warnings. The handbook does not form part of any employment contract and may be amended at the absolute discretion of The Jitu. Griffin Global Technologies provides equal employment opportunities for all applicants and employees. No unlawful discrimination will occur on the basis of race, colour, sex, language, religion, political opinion, nationality, ethnic origin, disability, pregnancy, marital status, or HIV status. All offers of employment are subject to satisfactory background checks, educational certificate verification, criminal records checks, and proof of medical fitness.",
                  audioText: "The Employee Handbook applies to all Jitu BPO employees in Kenya. It sets out the rules governing employment and failure to comply may lead to disciplinary action. Griffin provides equal employment opportunities — no discrimination on any protected characteristic. All employment offers require background checks, certificate verification, and medical fitness confirmation."
                },
                {
                  heading: "Contract, Probation and Working Hours",
                  text: "A signed contract of employment is issued to all employees upon engagement. Newly engaged staff are appointed on a six-month probationary period, which may be extended by up to three further months. During probation, either party may terminate with as many days' notice as days worked, up to a maximum of fourteen days. The normal working hours are those notified at the time of your engagement. No employee may leave before completing the scheduled period of duty without permission. Employees working from 8 PM through to 7 AM will be provided with transport. Three or more occurrences of lateness without valid reasons will result in disciplinary action. Employees must record their own time; recording time for another person is forbidden.",
                  audioText: "All employees receive a signed employment contract. Probation is six months, extendable by three more months. During probation, notice equals days worked up to fourteen days. Work your full scheduled hours and never leave early without permission. Employees working late nights receive transport. Three or more late occurrences without valid reason lead to disciplinary action."
                },
                {
                  heading: "Leave Policy",
                  text: "Annual leave is a minimum of 21 working days per calendar year. Leave must be approved by your Team Leader with at least seven days' notice, and you may not take paid employment elsewhere during leave. Sick leave is seven working days on full pay per year; beyond that, up to seven additional days at half pay. If sick leave abuse is suspected, a medical certificate from a registered practitioner may be requested — failure to provide one converts the absence to unauthorised leave without pay. Maternity leave is three calendar months on full pay. Paternity leave is fourteen days on full pay, with proof of birth notification and marriage required. Compassionate leave of up to four working days is granted for immediate family bereavement, offset against annual leave balance where applicable. The company observes twelve days of holiday including nine US public holidays (New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, Day After Thanksgiving, Christmas Eve, Christmas Day, and New Year's Eve) plus three discretionary days.",
                  audioText: "Annual leave is 21 working days per year, approved with seven days' notice. Sick leave is seven days on full pay; additional days at half pay. A medical certificate may be required and failure to provide it converts absence to unauthorised leave. Maternity leave is three months full pay. Paternity leave is fourteen days. Compassionate leave is up to four days. Twelve public holidays are observed."
                },
                {
                  heading: "Separation Policy",
                  text: "Employment separation covers resignation, redundancy, summary dismissal, or death. If you resign, provide one month's written notice; failure to do so means one month's salary will be deducted from your final dues. If the company terminates your contract, you receive one month's notice plus payment for days worked and accrued leave. Summary dismissal (without notice) applies to grounds defined in Section 44 of the Employment Act 2007, which include: absenting yourself from duty without lawful cause; becoming intoxicated during working hours; using abusive language towards superiors; knowingly refusing lawful instructions; being arrested for a recognisable offence; committing an offence against the employer or employer's property; constantly failing to meet targets without justifiable cause; and willfully neglecting duties. In redundancy, employees receive one month's notice, payment for days worked, accrued leave, and fifteen days' pay for every year of service. A certificate of service is issued in all cases (except where service is less than three months).",
                  audioText: "Resignation requires one month's written notice; failure to give notice means one month's salary is deducted from final dues. Summary dismissal applies for serious offences including intoxication, abusive language, refusing lawful instructions, property offences, and persistent failure to meet targets. Redundancy includes one month's notice and fifteen days' pay per year of service."
                },
                {
                  heading: "Code of Conduct and Data Protection",
                  text: "Every employee must act with integrity, professionalism, and respect at all times. This includes: treating all colleagues, clients, and visitors with courtesy; refraining from harassment, bullying, or discrimination of any kind; protecting all confidential information; using company resources — including computers, systems, and time — only for legitimate work purposes; and representing GGT positively in all external interactions. Company computers must never be used to run a personal business during working hours. Customer personal data must never be shared with external AI tools or systems outside GGT's controlled environment. Pasting client data into external tools is a data breach, regardless of intent or what data elements are excluded. Doing so is subject to disciplinary action up to and including summary dismissal.",
                  audioText: "Act with integrity, professionalism, and respect at all times. Use company resources only for work. Never share customer personal data with external AI tools or systems — this constitutes a data breach regardless of intent and may result in summary dismissal. Protect all confidential information in every interaction."
                },
                {
                  heading: "Disciplinary Process and Grievance Procedure",
                  text: "Minor misconduct triggers a verbal warning; repetition leads to a written warning, then a final written warning, and ultimately dismissal. Gross misconduct — including theft, fraud, harassment, deliberate data breach, intoxication at work, or wilful neglect of duties — results in summary dismissal. All disciplinary actions are documented and the employee has the right to respond at every stage. For workplace concerns, raise the matter informally with your line manager first. If unresolved, submit a formal grievance in writing to HR. HR will acknowledge receipt, schedule a meeting, and communicate the outcome in writing. If still unsatisfied, the matter escalates through the appeal process. The handbook also provides an alternative reporting path if the line manager is the subject of the complaint.",
                  audioText: "Misconduct follows a progressive discipline process: verbal warning, written warning, final written warning, and dismissal. Gross misconduct results in summary dismissal immediately. For grievances, raise informally with your line manager first, then submit formally to HR in writing if unresolved. All actions and decisions are documented throughout."
                }
              ]
            },
            practical: {
              video: "",
              videos: [
                "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Employee_Handbook_Part_One_1_xdgxuk",
                "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Employee_Handbook_Part_Two_1_yjrblu"
              ],
              duration: "18 min"
            },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "James has arrived late to work four times in one month without informing his Team Leader or providing valid reasons. What action can management take?",
                  options: [
                    "No action; lateness is a private matter",
                    "Issue a warning under the punctuality and attendance policy, with escalation to formal disciplinary action if the pattern continues",
                    "Dismiss James immediately on the fourth occurrence",
                    "Dock his wages without notification and consider the matter closed"
                  ],
                  correct: 1,
                  explanation: "The handbook treats repeated lateness without notice as a progressive discipline matter, starting with a warning and escalating if the pattern persists."
                },
                {
                  q: "Linda reports sick leave for five days but fails to submit a medical certificate when requested by management. How should this absence be treated?",
                  options: [
                    "Treat as fully paid sick leave; the certificate is a formality",
                    "Treat the absence as unauthorised, subject to disciplinary action and potential loss of pay, since the medical certificate was not provided as required",
                    "Ignore the issue and let the matter pass",
                    "Convert the days automatically into annual leave without consulting Linda"
                  ],
                  correct: 1,
                  explanation: "Sick leave is conditional on the documentation set out in the handbook. Failure to provide the certificate when requested converts the absence to unauthorised, with pay and disciplinary consequences."
                },
                {
                  q: "An employee pastes customer personal data into an external AI tool to summarise customer issues faster. Is this allowed under the handbook?",
                  options: [
                    "Allowed, because AI tools speed up customer service work",
                    "Allowed, provided the employee deletes the chat afterwards",
                    "Not allowed — sharing customer personal data with external AI tools breaches GGT's data protection policy and can result in disciplinary action up to and including dismissal",
                    "Allowed only if the employee has used the tool successfully before"
                  ],
                  correct: 2,
                  explanation: "External AI tools sit outside the company's controlled systems. Pasting customer data is a breach regardless of speed or intent."
                },
                {
                  q: "Kevin copies a dataset containing customer emails and partial financial records into an AI tool to generate insights faster. He believes it's safe because he did not include passwords. What is the appropriate management response?",
                  options: [
                    "Accept Kevin's rationale since he excluded passwords",
                    "Quietly remind him not to do it again",
                    "Treat the action as a serious data breach regardless of intent — initiate the data protection disciplinary process, contain the exposed data, and reinforce training across the wider team",
                    "Move Kevin to a different team without further action"
                  ],
                  correct: 2,
                  explanation: "Intent does not defuse a data breach. Removing passwords does not make customer emails and financial records safe to share externally. The right response is process-driven: discipline, containment, and team-wide reinforcement."
                },
                {
                  q: "A supervisor repeatedly makes unwelcome comments about a team member's appearance, making them uncomfortable. What should the employee do?",
                  options: [
                    "Endure it to avoid trouble with a senior",
                    "Confront the supervisor publicly in front of the team",
                    "Report the incident in writing through the harassment channels set out in the handbook — to HR or the designated alternative if the supervisor is the subject of the complaint",
                    "Resign and find work elsewhere"
                  ],
                  correct: 2,
                  explanation: "The handbook provides a formal harassment reporting route, including an alternative path when the supervisor is the subject. Written reporting protects the employee and creates a record."
                }
              ],
              questionBanks: [
                [
                  {
                    q: "James has arrived late to work four times in one month without informing his Team Leader or providing valid reasons. What action can management take?",
                    options: [
                      "No action; lateness is a private matter",
                      "Issue a warning under the punctuality and attendance policy, with escalation to formal disciplinary action if the pattern continues",
                      "Dismiss James immediately on the fourth occurrence",
                      "Dock his wages without notification and consider the matter closed"
                    ],
                    correct: 1,
                    explanation: "The handbook treats repeated lateness without notice as a progressive discipline matter, starting with a warning and escalating if the pattern persists."
                  },
                  {
                    q: "Linda reports sick leave for five days but fails to submit a medical certificate when requested by management. How should this absence be treated?",
                    options: [
                      "Treat as fully paid sick leave; the certificate is a formality",
                      "Treat the absence as unauthorised, subject to disciplinary action and potential loss of pay, since the medical certificate was not provided as required",
                      "Ignore the issue and let the matter pass",
                      "Convert the days automatically into annual leave without consulting Linda"
                    ],
                    correct: 1,
                    explanation: "Sick leave is conditional on the documentation set out in the handbook. Failure to provide the certificate converts the absence to unauthorised, with pay and disciplinary consequences."
                  },
                  {
                    q: "An employee pastes customer personal data into an external AI tool to summarise customer issues faster. Is this allowed under the handbook?",
                    options: [
                      "Allowed, because AI tools speed up customer service work",
                      "Allowed, provided the employee deletes the chat afterwards",
                      "Not allowed — sharing customer personal data with external AI tools breaches GGT's data protection policy and can result in dismissal",
                      "Allowed only if the employee has used the tool successfully before"
                    ],
                    correct: 2,
                    explanation: "External AI tools sit outside the company's controlled systems. Pasting customer data is a breach regardless of speed or intent."
                  },
                  {
                    q: "Kevin copies a dataset containing customer emails and partial financial records into an AI tool. He believes it's safe because he excluded passwords. What is the appropriate response?",
                    options: [
                      "Accept Kevin's rationale since he excluded passwords",
                      "Quietly remind him not to do it again",
                      "Treat the action as a serious data breach — initiate the disciplinary process, contain the exposed data, and reinforce training",
                      "Move Kevin to a different team without further action"
                    ],
                    correct: 2,
                    explanation: "Intent does not defuse a data breach. Removing passwords does not make customer emails and financial records safe to share externally."
                  },
                  {
                    q: "A supervisor repeatedly makes unwelcome comments about a team member's appearance. What should the employee do?",
                    options: [
                      "Endure it to avoid trouble with a senior",
                      "Confront the supervisor publicly in front of the team",
                      "Report the incident in writing through the harassment channels in the handbook — to HR or the designated alternative if the supervisor is the subject",
                      "Resign and find work elsewhere"
                    ],
                    correct: 2,
                    explanation: "The handbook provides a formal harassment reporting route with an alternative path when the supervisor is the subject. Written reporting protects the employee and creates a record."
                  }
                ],
                [
                  {
                    q: "Kevin leaves work two hours early without permission after completing his tasks. Which rule has Kevin violated?",
                    options: [
                      "No rule is broken if his tasks were complete",
                      "He has breached the working hours and attendance policy — completing tasks does not authorise leaving without approval",
                      "He should be praised for efficiency",
                      "He should be dismissed on the spot"
                    ],
                    correct: 1,
                    explanation: "Working hours are set by policy, not by task completion. Leaving early without authorisation breaches attendance rules even when the day's work is done."
                  },
                  {
                    q: "An employee reports to work smelling of alcohol but insists they are fit to work. What does the policy state?",
                    options: [
                      "Allow them to continue if they appear functional",
                      "Send them home only if a client complains",
                      "Remove the employee from duty for safety reasons, with possible disciplinary action under the substance-use clause — the employee's self-assessment does not override the policy",
                      "Issue a verbal caution and let them continue working"
                    ],
                    correct: 2,
                    explanation: "Safety and policy override the individual's self-assessment. The substance-use clause removes the judgement from someone who is the least reliable judge in that moment."
                  },
                  {
                    q: "An employee resigns immediately without giving the required one-month notice. What happens to their final dues?",
                    options: [
                      "Full final dues are released as normal",
                      "The employer may deduct payment in lieu of notice from final dues, in line with the handbook's notice and exit provisions",
                      "The employee forfeits all earned wages",
                      "The employee is automatically blacklisted from future re-hire"
                    ],
                    correct: 1,
                    explanation: "The notice period is contractual. Walking away without it gives the employer the right to deduct payment in lieu, as provided in the handbook's exit provisions."
                  },
                  {
                    q: "An employee uses company computers to run a personal online business during working hours. Which policies are breached?",
                    options: [
                      "No issue if it does not slow down their assigned work",
                      "Only the working hours policy is breached",
                      "Multiple policies are breached: misuse of company assets, working hours, and potential conflict of interest — each subject to disciplinary action",
                      "Only the IT acceptable use policy applies"
                    ],
                    correct: 2,
                    explanation: "Running a personal business on company time and equipment hits several rules at once. Treating it as one violation understates the breach."
                  },
                  {
                    q: "An employee resigns but their final salary is less than one month's pay, and they gave no notice. What applies?",
                    options: [
                      "The company absorbs the shortfall and pays everything owed",
                      "The employee must pay the remaining balance owed to the company in lieu of the unserved notice period",
                      "The company can take no further action once the employee leaves",
                      "The employee is entitled to full final dues regardless of notice"
                    ],
                    correct: 1,
                    explanation: "If the salary available is insufficient to cover the notice deduction, the remaining amount must be paid to the company by the employee, per the handbook's exit provisions."
                  }
                ]
              ]
            }
          },
          {
            id: "m1-s4",
            title: "Professional Image and Conduct",
            category: "culture",
            icon: "fa-user-tie",
            presentation: {
              video: "",
              pdf: "/slides/professional-image.pdf",
              duration: "7 min"
            },
            content: {
              estimatedDuration: 12,
              sections: [
                {
                  heading: "Punctuality and Shift Readiness",
                  text: "Punctuality at GGT means being ready to work at the start of your shift — not merely arriving or logging in at that time. If your shift begins at 8:00 a.m., your computer should be on, your tools open, your connection tested, and your mind focused before the clock hits 8. Setup time is your responsibility, not your employer's. Logging in at 8:00 and then spending ten minutes opening browsers and testing your connection means you have started late. This distinction matters for client-facing roles where every minute of delay has a visible cost. Set a personal rule: be ready fifteen minutes before your shift starts.",
                  audioText: "Punctuality at GGT means being ready to work at your shift start, not just arriving at it. If your shift starts at 8:00, your tools should be open, your connection tested, and your focus set before the clock hits 8. Setup time is your responsibility. Be ready fifteen minutes before your shift starts."
                },
                {
                  heading: "Professional Appearance and Dress Code",
                  text: "Smart-casual is the minimum standard in the office at all times. Client-facing days require business professional attire. Clothes must be clean, pressed, and free from tears, slogans, or offensive graphics. Avoid heavy fragrances in shared workspaces out of consideration for colleagues. For remote and hybrid working, your professional appearance standard does not change when you work from home. If your camera is on — and it should be for client-facing calls — you are representing GGT visually. Dress as you would in the office. Ensure your background is neutral or uses an approved branded virtual background. Ensure your lighting is adequate and that your face is clearly visible. A dimly lit, cluttered background conveys disorganisation even before you speak.",
                  audioText: "Smart-casual is the minimum in the office. Client-facing days require business professional. For remote work, professional appearance standards do not change. If your camera is on, you represent GGT. Use a neutral or branded background, ensure good lighting, and dress as you would in the office."
                },
                {
                  heading: "Workplace Relationships and Conduct",
                  text: "GGT does not prohibit personal relationships between employees. However, workplace conduct must not negatively affect productivity or the comfort and dignity of colleagues. If two team members are in a personal relationship, personal conversations and displays of affection must be kept outside work hours and the workplace entirely. When personal interaction spills into workstation time, interrupts team focus, or makes others feel excluded or uncomfortable, it stops being a private matter and becomes a workplace conduct issue. Romantic relationships involving a direct reporting line are a particular concern and must be disclosed to HR.",
                  audioText: "GGT does not prohibit personal relationships. However, workplace conduct must not affect productivity or the comfort of others. Keep personal conversations and displays of affection outside work hours. When personal interaction affects team focus or makes others uncomfortable, it becomes a workplace conduct issue. Relationships involving a reporting line must be disclosed to HR."
                },
                {
                  heading: "Digital Presence, Social Media and Workspace",
                  text: "Your LinkedIn profile is part of your professional image. Keep it up to date with your current role and use a professional headshot. Never post negative comments about Griffin, clients, or colleagues on any social media platform. Assume every online communication is permanent and public — because it is. Griffin reserves the right to address social media conduct that damages the company's reputation. Keep your physical and digital workspaces clean and organised at all times. A cluttered desk signals disorganisation. Close client documents and applications when not in use. Lock your screen every time you step away, even for a moment. In shared spaces, clean up immediately after yourself. These habits protect client confidentiality and model the professionalism that GGT expects.",
                  audioText: "Keep your LinkedIn profile current and professional. Never post negatively about Griffin, clients, or colleagues — assume all online content is permanent and public. Keep your workspace clean and organised. Lock your screen every time you step away. These habits protect confidentiality and model GGT's professionalism."
                },
                {
                  heading: "Accountability, Predictable Delivery and Innovation in Your Role",
                  text: "Professional image is not only about appearance. It extends to how reliably you deliver. When you discover a potential delay — even days before a deadline — raise it immediately. Propose options. Do not wait and hope the problem resolves itself. Two days of warning is two days of options; waiting until the deadline collapses those options into a crisis. When your team's current process is causing delays, evaluate whether a better approach exists. Innovation in your role means assessing what works, identifying the actual gap, and proposing improvements with a clear benefit and business rationale. It does not mean change for its own sake — it means deliberate, business-aligned improvement that adds real value.",
                  audioText: "Professional image extends beyond appearance to how reliably you deliver. Raise potential delays immediately, even days early, and propose options. Two days of warning gives two days of options. When a process causes delays, evaluate alternatives methodically. Innovation means deliberate, business-aligned improvement — not change for its own sake."
                }
              ]
            },
            practical: { video: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Professional_Image_1_drqsnc", duration: "4 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "Brian's shift starts at 8:00 a.m. He logs in at exactly 8:00, then spends 10 minutes checking his connection and opening work tools. His team lead raises concerns about punctuality. What should Brian have done?",
                  options: [
                    "He was on time; logging in at 8:00 satisfies the requirement",
                    "Punctuality means being ready to work at the shift start, not arriving at it — Brian should have logged in earlier so his tools and connection were tested before 8:00",
                    "The team lead was overreacting; 10 minutes is normal",
                    "Brian should request that his shift start at 8:10 going forward"
                  ],
                  correct: 1,
                  explanation: "Logging in at 8:00 is not the same as being ready at 8:00. The shift start is a delivery time, not a login time. Setup happens before the clock starts."
                },
                {
                  q: "Mary is working remotely and joins a client meeting wearing a pajama top because she is at home. Her camera is on during the meeting. What should she have done?",
                  options: [
                    "Remote work allows relaxed dress; her setup was fine",
                    "She should have dressed in line with professional appearance standards for client-facing interactions, regardless of working location, since the camera made her visibly representative of GGT",
                    "She should have turned the camera off and continued as is",
                    "The client should be informed in advance that the team works in casual attire"
                  ],
                  correct: 1,
                  explanation: "A live camera turns a private space into a client-facing one. The professional appearance standards travel with the role, not the location."
                },
                {
                  q: "Two colleagues begin a romantic relationship and frequently spend long periods chatting at their workstations, making others uncomfortable and distracted. What is the correct interpretation?",
                  options: [
                    "Personal relationships are private; no action is warranted",
                    "The guidelines do not prohibit relationships, but workplace conduct must not affect productivity or the comfort of others — personal interactions must be kept outside work hours and workspaces",
                    "One of them should be moved to a different department",
                    "The relationship itself is the breach and should be reported"
                  ],
                  correct: 1,
                  explanation: "The line is conduct, not the relationship itself. When personal interaction affects colleagues' work or comfort, it stops being private and becomes a workplace issue."
                },
                {
                  q: "A project coordinator realises on Wednesday that a data source delay may affect Friday's client report. She considers waiting until Friday to raise the issue. What is the most appropriate action?",
                  options: [
                    "Wait until Friday to assess fully before raising it",
                    "Raise the issue immediately, propose options including a revised timeline or interim delivery, and keep stakeholders informed — Accountability and Predictable Delivery require early disclosure, not hopeful silence",
                    "Submit the Friday report with the known issue and address it the following week",
                    "Ask a colleague to mention it informally on her behalf"
                  ],
                  correct: 1,
                  explanation: "Two days of warning is two days of options. Silence collapses those options into a missed deadline on Friday. Accountability and Predictable Delivery both call for early disclosure."
                },
                {
                  q: "An operations team notices midway through the month that higher-than-usual workload may delay project completion. The deadline is still two weeks away. What does Predictable Delivery require?",
                  options: [
                    "Wait until the deadline week to see if the team catches up",
                    "Flag the delivery risk to stakeholders now, propose mitigation, and agree a revised plan if needed — so the client is not surprised at the deadline",
                    "Push through quietly and absorb the overrun internally",
                    "Ask the client to extend the deadline without explaining why"
                  ],
                  correct: 1,
                  explanation: "Predictable Delivery is built on the absence of surprises. Two weeks is enough lead time to renegotiate scope, add capacity, or reset expectations. Waiting wastes that lead time."
                }
              ],
              questionBanks: [
                [
                  {
                    q: "Brian's shift starts at 8:00 a.m. He logs in at exactly 8:00, then spends 10 minutes testing his connection and opening tools. His team lead raises concerns. What should Brian have done?",
                    options: [
                      "He was on time; logging in at 8:00 satisfies the requirement",
                      "Punctuality means being ready to work at the shift start — Brian should have logged in earlier so his tools were tested before 8:00",
                      "The team lead was overreacting; 10 minutes is normal",
                      "Brian should request that his shift start at 8:10 going forward"
                    ],
                    correct: 1,
                    explanation: "Logging in at 8:00 is not the same as being ready at 8:00. Setup happens before the clock starts."
                  },
                  {
                    q: "Mary works remotely and joins a client meeting wearing a pajama top. Her camera is on. What should she have done?",
                    options: [
                      "Remote work allows relaxed dress; her setup was fine",
                      "She should have dressed professionally regardless of working location — the camera made her visibly representative of GGT",
                      "She should have turned the camera off",
                      "The client should be informed in advance that the team works casually"
                    ],
                    correct: 1,
                    explanation: "A live camera turns a private space into a client-facing one. Professional appearance standards travel with the role, not the location."
                  },
                  {
                    q: "Two colleagues in a relationship frequently chat at their workstations, making others uncomfortable and distracted. What is the correct interpretation?",
                    options: [
                      "Personal relationships are private; no action is warranted",
                      "Workplace conduct must not affect productivity or the comfort of others — personal interactions must be kept outside work hours and workspaces",
                      "One of them should be moved to a different department immediately",
                      "The relationship itself is the breach and should be reported"
                    ],
                    correct: 1,
                    explanation: "The line is conduct, not the relationship. When personal interaction affects colleagues' work or comfort, it stops being private and becomes a workplace issue."
                  },
                  {
                    q: "A project coordinator realises on Wednesday that a data source delay may affect Friday's client report. She considers waiting until Friday to raise it. What is the most appropriate action?",
                    options: [
                      "Wait until Friday to assess fully",
                      "Raise the issue immediately, propose options, and keep stakeholders informed — Accountability and Predictable Delivery require early disclosure",
                      "Submit the Friday report with the known issue and address it next week",
                      "Ask a colleague to mention it informally"
                    ],
                    correct: 1,
                    explanation: "Two days of warning is two days of options. Silence collapses options into a missed deadline. Accountability and Predictable Delivery call for early disclosure."
                  },
                  {
                    q: "An operations team notices midway through the month that workload may delay project completion. The deadline is two weeks away. What does Predictable Delivery require?",
                    options: [
                      "Wait until deadline week to see if the team catches up",
                      "Flag the delivery risk to stakeholders now, propose mitigation, and agree a revised plan — so the client is not surprised at the deadline",
                      "Push through quietly and absorb the overrun internally",
                      "Ask the client to extend the deadline without explaining why"
                    ],
                    correct: 1,
                    explanation: "Two weeks is enough lead time to renegotiate scope, add capacity, or reset expectations. Predictable Delivery is built on the absence of surprises."
                  }
                ],
                [
                  {
                    q: "Mary works remotely and joins a client meeting wearing a pajama top. Her camera is on. What should she have done?",
                    options: [
                      "Remote work allows relaxed dress; her setup was fine",
                      "She should have dressed professionally regardless of location — the camera made her visibly representative of GGT",
                      "She should have turned the camera off",
                      "Clients should accept casual attire for remote workers"
                    ],
                    correct: 1,
                    explanation: "A live camera turns a private space into a client-facing one. Professional appearance standards travel with the role, not the location."
                  },
                  {
                    q: "Two colleagues in a relationship frequently chat at their workstations, making others uncomfortable. What applies?",
                    options: [
                      "Personal relationships are private; no action is warranted",
                      "Workplace conduct must not affect productivity or the comfort of others — personal interactions must stay outside work hours and workspaces",
                      "Both should be disciplined immediately",
                      "The relationship itself is the breach"
                    ],
                    correct: 1,
                    explanation: "The line is conduct, not the relationship itself. When personal interaction affects the team's work environment, it becomes a workplace issue."
                  },
                  {
                    q: "A project coordinator discovers a delay risk on Wednesday for Friday's client report. She waits until Friday to raise it. What values were violated?",
                    options: [
                      "No values were violated; she waited to have more information",
                      "Accountability and Predictable Delivery were both violated — early disclosure protects the client and the team's credibility",
                      "Only Accountability was violated",
                      "This is a technical issue, not a values issue"
                    ],
                    correct: 1,
                    explanation: "Two days of warning is two days of options. Silence transfers the problem to the client. Both Accountability and Predictable Delivery call for early, proactive disclosure."
                  },
                  {
                    q: "An operations team notices a workload overrun risk two weeks before the deadline. They push through quietly without informing the client. What should they have done?",
                    options: [
                      "Nothing — the deadline is still two weeks away",
                      "Flag the delivery risk immediately, propose mitigation options, and agree a revised plan with the client if needed",
                      "Ask a colleague from another team to absorb the extra work silently",
                      "Deliver whatever is complete on the deadline and explain afterwards"
                    ],
                    correct: 1,
                    explanation: "Predictable Delivery means eliminating surprises. Two weeks of lead time is valuable — use it to communicate early and realign expectations before the deadline arrives."
                  },
                  {
                    q: "A team continues using a fully manual process that causes delays, even though newer tools could streamline the work. A team member suggests exploring an automated solution. Which action best reflects GGT's value of Innovation?",
                    options: [
                      "Reject the suggestion; the current process is functioning",
                      "Approve any automation request without review to show openness to innovation",
                      "Evaluate the suggestion against business value, integration fit, and cost, and pilot it if it meets the criteria — Innovation at GGT is deliberate and business-aligned, not change for its own sake",
                      "Wait for leadership to mandate automation before acting"
                    ],
                    correct: 2,
                    explanation: "Innovation is not reflexive approval or reflexive rejection. The value calls for a structured evaluation against business criteria, then a controlled pilot. That is how improvement compounds without disruption."
                  }
                ]
              ]
            }
          },
          {
            id: "m1-s5",
            title: "Team Dynamics and Collaboration",
            category: "culture",
            icon: "fa-people-group",
            presentation: {
              video: "",
              pdf: "/slides/team-dynamics.pdf",
              duration: "8 min"
            },
            content: {
              estimatedDuration: 13,
              sections: [
                {
                  heading: "Team Roles and Psychological Safety",
                  text: "Effective teams have clear role clarity. At GGT, each team member should be able to state their own responsibilities and how they connect to the team's overall outputs. Ambiguity creates both duplication and gaps. When roles are unclear, raise it with your manager within the first week. A RACI chart — Responsible, Accountable, Consulted, Informed — is a useful tool for clarifying who does what. Alongside role clarity, high-performing teams share one other foundation: psychological safety. This means every member feels safe to speak up, ask questions, raise concerns, and admit mistakes without fear of humiliation or punishment. We build psychological safety by listening without interruption, responding to mistakes with curiosity rather than blame, and genuinely celebrating learning from failure. If you see psychological safety violated, you are empowered to name it.",
                  audioText: "Effective teams have clear role clarity. Each member should know their responsibilities and how they connect to team outputs. When roles are unclear, raise it with your manager within the first week. RACI charts help clarify who does what. Psychological safety means every member can speak up and admit mistakes without fear. Build it by listening without interruption and responding to mistakes with curiosity, not blame."
                },
                {
                  heading: "Inclusive Participation: Drawing Out the Quiet and the Vocal",
                  text: "Strong teams do not operate on volume. Some team members naturally speak more; others think deeply but rarely initiate. A team that only hears its loudest voices operates at a fraction of its collective intelligence. Leaders and senior team members have a responsibility to actively invite quieter voices. This can mean directly asking a silent member for their perspective, creating space for written input before meetings, using round-robin formats for idea-sharing, and explicitly telling the team that silence is not taken as agreement. Quieter members have a corresponding responsibility to find and use their voice — even if it takes preparation. Prepare your point before the meeting starts so that hesitation does not keep your best thinking out of the conversation.",
                  audioText: "Strong teams do not operate on volume. Leaders must actively invite quieter voices — ask them directly, allow written input, use round-robin formats. Quieter members have a responsibility to find and use their voice, even with preparation. Prepare your point before the meeting so hesitation does not silence your best thinking."
                },
                {
                  heading: "Skill-Based Task Assignment",
                  text: "At GGT, tasks are assigned based on skills, capacity, and development needs — not seniority, familiarity, or proximity to the team lead. Assigning work repeatedly to the same people because they are reliable is efficient in the short term and damaging in the long term. It creates over-dependence, prevents others from developing, and builds fragility into the team's overall capability. When assigning tasks, first identify the skills required, then match them to the team member whose development and capacity best align. Communicate the rationale, provide appropriate support, and close the loop with feedback when the task is complete.",
                  audioText: "Tasks at GGT are assigned based on skills, capacity, and development needs — not seniority or familiarity. Repeating the same assignments creates fragility and prevents growth. Identify the skills required, match them to the best-fit team member, communicate the rationale, provide support, and close the loop with feedback."
                },
                {
                  heading: "Communication Styles, Workload Balance and Conflict",
                  text: "Teams are rarely uniform in how they prefer to communicate. Some rely on detailed documentation before decisions; others prefer verbal conversations and agile stand-ups. Neither is wrong — misalignment between styles creates friction. The first step is to make the preference visible: agree as a team on a shared communication rhythm that acknowledges different styles rather than assuming one is correct. When workload is visibly unbalanced, name it, redistribute it, and check in regularly. Unaddressed imbalance builds resentment and erodes psychological safety over time. For conflicts, start with a direct, private conversation using factual language. If unresolved, bring in a manager as a neutral facilitator. Document what was agreed. Address conflict early — it compounds with delay.",
                  audioText: "Teams differ in communication style: some prefer documentation, others verbal and agile. Agree on a shared communication rhythm that acknowledges both. Address workload imbalance by naming it, redistributing it, and checking in regularly. For conflicts, start with a direct, private conversation, then involve a manager if unresolved. Document agreements. Address conflict early."
                },
                {
                  heading: "Cross-Cultural Awareness and Inclusive Leadership",
                  text: "GGT is a US-Kenya operation with clients and colleagues across multiple regions. Cultural differences in communication style, hierarchy, and time orientation are real, meaningful, and must be respected. When in doubt, default to formal and respectful communication, and ask rather than assume. A team lead who notices that discussions are consistently dominated by one cultural group should introduce structured turn-taking and explicitly evaluate ideas on their merit, not on who delivered them. Cultural differences in working style and orientation are strengths when they are understood and navigated with genuine curiosity. Inclusive leadership means creating conditions where every team member can contribute at their full capacity.",
                  audioText: "GGT is a US-Kenya operation with clients across multiple regions. Default to formal and respectful communication, and ask rather than assume. Introduce structured turn-taking and evaluate ideas on merit. Cultural differences are strengths when navigated with curiosity and inclusive leadership."
                }
              ]
            },
            practical: { video: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Team_Dynamics_1_xse40x", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "During team meetings, one member consistently remains silent. By the end of every session, no one knows her views. What is the team's responsibility?",
                  options: [
                    "Silence means agreement; proceed as normal",
                    "Actively invite her contribution — ask directly, use written input formats, or implement round-robin sharing. Silence is not taken as agreement",
                    "Wait for her to speak up on her own initiative",
                    "Escalate to HR that she is disengaged"
                  ],
                  correct: 1,
                  explanation: "Teams operating only on the loudest voices lose much of their collective intelligence. Leaders and teammates have a responsibility to actively draw out quieter members rather than letting volume decide the conversation."
                },
                {
                  q: "A team lead always assigns complex tasks to the same two reliable people. Other team members feel overlooked and underdeveloped. What should the team lead do?",
                  options: [
                    "Continue with the same two; reliability outweighs development",
                    "Assign complex tasks based on skills, capacity, and development needs — communicate the rationale, support the assignee, and close the loop with feedback",
                    "Rotate tasks randomly to be fair",
                    "Ask the reliable two to mentor others before any redistribution"
                  ],
                  correct: 1,
                  explanation: "Repeating the same assignments builds over-dependence and fragility. Skill-based assignment with clear rationale, support, and feedback is how teams grow their overall capability."
                },
                {
                  q: "Two colleagues conflict over collaboration style: one prefers detailed documents in advance, the other prefers verbal stand-ups. What is the most effective resolution?",
                  options: [
                    "Ask HR to mandate one style for the team",
                    "Tell the more junior person to match the senior's preference",
                    "Make the different styles visible to the team and agree on a shared communication rhythm that acknowledges both approaches rather than declaring one correct",
                    "Separate the two into different subteams"
                  ],
                  correct: 2,
                  explanation: "Style differences create friction only when they are invisible. Naming them and agreeing on a shared rhythm converts a recurring conflict into a working agreement."
                },
                {
                  q: "One team member is carrying significantly more work than others. Morale is visibly declining. What should be done?",
                  options: [
                    "Acknowledge their hard work privately and continue as is",
                    "Name the imbalance, redistribute tasks equitably, and check in regularly — unaddressed workload imbalance builds resentment and erodes psychological safety",
                    "Wait for the overloaded member to raise the issue themselves",
                    "Assign the overloaded member a deputy to maintain the same structure"
                  ],
                  correct: 1,
                  explanation: "Visible imbalance that is unnamed becomes resentment. Naming it and redistributing it is a team responsibility, not just a management one."
                },
                {
                  q: "A team lead notices that in every discussion, ideas from one cultural subgroup are adopted while ideas from the other are set aside, regardless of merit. What is the inclusive leadership response?",
                  options: [
                    "Assume the adopted ideas are simply better and continue",
                    "Introduce structured turn-taking and explicitly evaluate all ideas on their merit — and name the pattern to the team so it can be addressed collectively",
                    "Reorganise the team by cultural background to reduce friction",
                    "Ask the overlooked subgroup to present their ideas more assertively"
                  ],
                  correct: 1,
                  explanation: "Cultural bias in idea adoption compounds when left unnamed. Structured processes and explicit merit evaluation are the lead's tool for correcting the pattern without blaming individuals."
                }
              ]
            }
          }
        ],
        conclusion: {
          id: "module-1-conclusion",
          title: "Module 1 Conclusion",
          description: "A short recap of Company Orientation and a look ahead to Module 2.",
          video: "https://player.cloudinary.com/embed/?cloud_name=dq5jurqbc&public_id=Module_One_Closing_Video_relsum",
          duration: "5 min"
        }
      },
      {
        id: "module-2",
        number: 2,
        title: "Systems and Tools",
        icon: "fa-screwdriver-wrench",
        introVideo: "",
        introDescription: "Hands-on coverage of the Griffin tech stack: intranet, email, cloud storage, communication platforms, and security tools. By the end you can navigate every daily-use system.",
        subtopics: [
          {
            id: "m2-s1",
            title: "Griffin Tech Stack",
            category: "technical",
            icon: "fa-server",
            presentation: { video: "", duration: "9 min" },
            content: {
              estimatedDuration: 9,
              sections: [
                {
                  heading: "Cloud and Infrastructure",
                  text: "Griffin operates on a hybrid cloud model using AWS and Azure. All client environments are isolated by project. Infrastructure as Code ensures consistency and auditability. Every change is version-controlled, peer-reviewed, and automatically tested before deployment. This protects both Griffin and our clients.",
                  audioText: "Griffin operates on a hybrid cloud model using AWS and Azure. All client environments are isolated by project. Infrastructure as Code ensures consistency and auditability."
                },
                {
                  heading: "Productivity Tools",
                  text: "Microsoft 365 is our productivity backbone. Teams handles meetings, screen sharing, and client calls. Outlook manages email and scheduling. SharePoint stores shared documents with version history. OneDrive syncs personal files across devices. Development teams use GitHub for code, Jira for tracking, and Figma for design collaboration.",
                  audioText: "Microsoft 365 is our productivity backbone. Teams for meetings, Outlook for email, SharePoint for document management, and OneDrive for personal file sync. Development teams use GitHub, Jira, and Figma."
                },
                {
                  heading: "Security Stack",
                  text: "Security is non-negotiable. Every endpoint runs Endpoint Detection and Response. Multi-factor authentication is mandatory for all systems. Passwords must be sixteen characters minimum and rotated every ninety days. All remote access requires VPN. These rules protect client data, intellectual property, and our reputation.",
                  audioText: "Security is non-negotiable. Every endpoint runs EDR. Multi-factor authentication is mandatory. Passwords must be sixteen characters minimum and rotated every ninety days. All remote access requires VPN."
                }
              ]
            },
            practical: { video: "", duration: "6 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "Which cloud platforms does Griffin use?",
                  options: ["AWS only", "Azure only", "AWS and Azure hybrid", "Google Cloud only"],
                  correct: 2,
                  explanation: "Griffin operates a hybrid cloud using AWS and Azure."
                },
                {
                  q: "What is the minimum password length?",
                  options: ["8 characters", "12 characters", "16 characters", "20 characters"],
                  correct: 2,
                  explanation: "Passwords must be at least sixteen characters."
                },
                {
                  q: "How often must passwords be rotated?",
                  options: ["30 days", "60 days", "90 days", "1 year"],
                  correct: 2,
                  explanation: "Password rotation is required every ninety days."
                }
              ]
            }
          },
          {
            id: "m2-s2",
            title: "Communication Platforms",
            category: "technical",
            icon: "fa-tower-broadcast",
            presentation: { video: "", duration: "8 min" },
            content: {
              estimatedDuration: 8,
              sections: [
                {
                  heading: "Internal Communication",
                  text: "Microsoft Teams is the standard for all meetings, screen sharing, and client video calls. Slack supplements Teams for quick, informal team coordination and alerts. Email remains the standard for formal external communication and record-keeping. Each tool has a purpose; using the wrong channel creates confusion and compliance risk.",
                  audioText: "Microsoft Teams is the standard for all meetings. Slack supplements Teams for quick coordination. Email remains the standard for formal external communication."
                },
                {
                  heading: "Client Communication",
                  text: "All client meetings require a calendar invite with a clear agenda. Video calls must use approved platforms with waiting rooms enabled. Never share meeting links in unsecured channels. For sensitive topics, use a direct call rather than written messages to preserve tone and context.",
                  audioText: "All client meetings require a calendar invite with an agenda. Video calls must use approved platforms with waiting rooms enabled. Never share meeting links in unsecured channels."
                },
                {
                  heading: "Calendar Hygiene",
                  text: "Your calendar is a commitment to your colleagues. Keep it up to date, block focus time for deep work, and always include a purpose in meeting invites. If you decline a meeting, propose an alternative time or delegate attendance with context. An accurate calendar helps teams coordinate across time zones.",
                  audioText: "Your calendar is a commitment. Keep it up to date, block focus time, and always include a purpose in meeting invites. If you decline a meeting, propose an alternative or delegate attendance."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "What is the standard platform for meetings?",
                  options: ["Zoom", "Microsoft Teams", "Slack", "Skype"],
                  correct: 1,
                  explanation: "Teams is the standard for meetings and client calls."
                },
                {
                  q: "What must every meeting invite include?",
                  options: ["A gift registry", "An agenda", "An RSVP only", "A dress code"],
                  correct: 1,
                  explanation: "Every meeting invite must include an agenda."
                },
                {
                  q: "What should you do if you decline a meeting?",
                  options: ["Ignore it", "Propose an alternative or delegate", "Complain to your manager", "Escalate to the CEO"],
                  correct: 1,
                  explanation: "Propose an alternative time or delegate attendance."
                }
              ]
            }
          },
          {
            id: "m2-s3",
            title: "Security and Data Policies",
            category: "technical",
            icon: "fa-shield-halved",
            presentation: { video: "", duration: "10 min" },
            content: {
              estimatedDuration: 10,
              sections: [
                {
                  heading: "Data Classification",
                  text: "Griffin classifies data into four levels. Public information carries no restriction. Internal information is for Griffin employees only. Confidential information is restricted to project teams and named individuals. Restricted information includes trade secrets and demands encryption at rest and in transit with strict access logging.",
                  audioText: "Griffin classifies data into four levels. Public, Internal, Confidential, and Restricted. Restricted data includes trade secrets and demands strict controls."
                },
                {
                  heading: "Handling Sensitive Data",
                  text: "Sensitive client data belongs on encrypted company servers with access logging and backup. Personal USB drives, public cloud accounts, email drafts, and local desktop storage are never acceptable locations. If you need to transfer data, use approved secure transfer tools. When in doubt, ask IT Security before moving data.",
                  audioText: "Sensitive client data belongs on encrypted company servers. Personal USB drives, public cloud accounts, and email drafts are never acceptable storage locations."
                },
                {
                  heading: "Incident Response",
                  text: "If you suspect a security incident such as phishing, malware, or unauthorized access, report it immediately to security@griffinglobal.com. Do not attempt to investigate alone, do not forward suspicious emails, and do not shut down your machine unless instructed. Speed of reporting matters more than perfect analysis.",
                  audioText: "If you suspect a security incident, report it immediately to security at griffinglobal dot com. Do not attempt to investigate alone. Speed of reporting matters more than perfect analysis."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "How many data classification levels exist at Griffin?",
                  options: ["2", "3", "4", "5"],
                  correct: 2,
                  explanation: "Griffin uses four levels: Public, Internal, Confidential, Restricted."
                },
                {
                  q: "Where does sensitive client data belong?",
                  options: ["Personal USB drive", "Email drafts folder", "Encrypted company server", "Local desktop"],
                  correct: 2,
                  explanation: "Encrypted servers provide audit trails and access controls."
                },
                {
                  q: "Who should you contact for a security incident?",
                  options: ["Your manager only", "security@griffinglobal.com", "The police directly", "Ignore it"],
                  correct: 1,
                  explanation: "Report security incidents to security@griffinglobal.com immediately."
                }
              ]
            }
          }
        ],
        conclusion: {
          id: "module-2-conclusion",
          title: "Module 2 Conclusion",
          description: "A short recap of the Griffin tech stack and a look ahead to Module 3.",
          video: "",
          duration: "4 min"
        }
      },
      {
        id: "module-3",
        number: 3,
        title: "Standard Operating Procedures",
        icon: "fa-clipboard-list",
        introVideo: "",
        introDescription: "How SOPs work at Griffin, where to find them, how to follow them, and how to propose updates. You'll leave able to read, apply, and contribute to SOPs.",
        subtopics: [
          {
            id: "m3-s1",
            title: "Understanding SOPs",
            category: "technical",
            icon: "fa-scroll",
            presentation: { video: "", duration: "7 min" },
            content: {
              estimatedDuration: 7,
              sections: [
                {
                  heading: "What Is an SOP",
                  text: "A Standard Operating Procedure is a documented, step-by-step process for completing a task or making a decision. SOPs exist to ensure consistency, reduce risk, and train new team members efficiently. They are not suggestions; they are the agreed best practice until updated.",
                  audioText: "A Standard Operating Procedure is a documented, step-by-step process for completing a task or making a decision. SOPs exist to ensure consistency, reduce risk, and train new team members efficiently."
                },
                {
                  heading: "Why SOPs Matter",
                  text: "Without SOPs, quality depends on individual memory, mood, and interpretation. With SOPs, quality becomes repeatable and scalable. SOPs also protect the organization during audits, compliance reviews, and client due diligence. They demonstrate that we take process seriously.",
                  audioText: "Without SOPs, quality depends on individual memory and mood. With SOPs, quality becomes repeatable. SOPs also protect the organization during audits and compliance reviews."
                },
                {
                  heading: "SOP Lifecycle",
                  text: "SOPs are born from need, not bureaucracy. The lifecycle is simple: draft the procedure based on current best practice, review with stakeholders who perform the work, approve by designated authority, train the team, monitor compliance, and update when reality changes. An outdated SOP is worse than no SOP.",
                  audioText: "SOPs are born from need, not bureaucracy. The lifecycle is: draft, review with stakeholders, approve, train the team, monitor compliance, and update when reality changes."
                }
              ]
            },
            practical: { video: "", duration: "4 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "What does SOP stand for?",
                  options: ["Standard Operating Procedure", "Summary of Process", "Statement of Purpose", "System Outline Plan"],
                  correct: 0,
                  explanation: "Standard Operating Procedure is the correct term."
                },
                {
                  q: "What is the primary purpose of an SOP?",
                  options: ["Add paperwork", "Standardize steps for consistency", "Assign blame", "Replace human judgment"],
                  correct: 1,
                  explanation: "SOPs ensure consistent execution across the team."
                },
                {
                  q: "What is the first step in the SOP lifecycle?",
                  options: ["Approve", "Draft", "Train", "Monitor"],
                  correct: 1,
                  explanation: "Drafting comes first, based on current best practice."
                }
              ]
            }
          },
          {
            id: "m3-s2",
            title: "Following Procedures",
            category: "technical",
            icon: "fa-check-double",
            presentation: { video: "", duration: "8 min" },
            content: {
              estimatedDuration: 8,
              sections: [
                {
                  heading: "Read Before Acting",
                  text: "When assigned a task governed by an SOP, read the procedure before acting. If the SOP seems outdated or impractical, follow it while raising the concern through your manager. Never ignore a procedure because it is inconvenient. Exceptions require documented approval.",
                  audioText: "When assigned a task governed by an SOP, read the procedure before acting. If it seems outdated, follow it while raising the concern through your manager."
                },
                {
                  heading: "Documenting Deviations",
                  text: "Sometimes reality requires flexibility. When you must deviate from an SOP, document the reason, the risk assessment, the mitigations taken, and the approval from your manager or designated authority. Undocumented deviations create liability and erode trust in the process.",
                  audioText: "When you must deviate from an SOP, document the reason, the risk assessment, and the approval from your manager. Undocumented deviations create liability."
                },
                {
                  heading: "Escalation Path",
                  text: "If an SOP conflicts with client needs, safety requirements, or legal obligations, escalate immediately. Your manager and the risk team will decide whether the SOP needs a temporary exception, a permanent update, or additional training. Do not make this judgment call alone.",
                  audioText: "If an SOP conflicts with client needs or safety requirements, escalate immediately. Your manager and the risk team will decide the right path."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "What should you do if an SOP seems outdated?",
                  options: ["Ignore it", "Follow it while raising the concern", "Tell a colleague to break it", "Refuse the task"],
                  correct: 1,
                  explanation: "Follow the current SOP while flagging the issue."
                },
                {
                  q: "What must every deviation have?",
                  options: ["No documentation", "Documentation and approval", "A fine", "A team vote"],
                  correct: 1,
                  explanation: "Every deviation gets documented and approved."
                },
                {
                  q: "Who approves temporary deviations?",
                  options: ["Any employee", "Manager or designated authority", "The newest hire", "External consultants"],
                  correct: 1,
                  explanation: "Authorized personnel approve deviations."
                }
              ]
            }
          },
          {
            id: "m3-s3",
            title: "Creating and Updating SOPs",
            category: "technical",
            icon: "fa-pen-to-square",
            presentation: { video: "", duration: "9 min" },
            content: {
              estimatedDuration: 9,
              sections: [
                {
                  heading: "SOP Template",
                  text: "Every SOP at Griffin follows a standard template: title, purpose, scope, responsibilities, definitions, procedure steps with decision points, references, and version history. Consistent formatting makes SOPs scannable and reduces training time. Use the official template from the SOP repository on the internal portal.",
                  audioText: "Every SOP at Griffin follows a standard template: title, purpose, scope, responsibilities, definitions, procedure steps, references, and version history."
                },
                {
                  heading: "Writing Clear Steps",
                  text: "Use action verbs, one instruction per step, and include decision points where the process branches. Write for the person who has never done the task before. Avoid jargon, acronyms without definitions, and assumptions about prior knowledge. Test your SOP by asking a colleague to follow it literally.",
                  audioText: "Use action verbs, one instruction per step, and include decision points. Write for the person who has never done the task before."
                },
                {
                  heading: "Review and Communication",
                  text: "SOPs are reviewed annually or after major process changes. When an SOP is updated, the author must communicate the change through formal training, not just email. Update the version number every time, archive the old version, and confirm that all affected employees have been notified.",
                  audioText: "SOPs are reviewed annually or after major process changes. When updated, communicate through formal training, not just email. Update the version number every time."
                }
              ]
            },
            practical: { video: "", duration: "6 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "What must every SOP include?",
                  options: ["Author biography", "Purpose, scope, and step-by-step instructions", "Company history", "Team opinions"],
                  correct: 1,
                  explanation: "Clear purpose, scope, and steps make an SOP usable."
                },
                {
                  q: "How are SOP updates communicated?",
                  options: ["Word of mouth", "Formal training and documentation", "Email only", "No communication needed"],
                  correct: 1,
                  explanation: "Formal training drives compliance."
                },
                {
                  q: "When are SOPs reviewed?",
                  options: ["Never", "Annually or when processes change", "Every five years", "Only after audits"],
                  correct: 1,
                  explanation: "Annual reviews keep them current."
                }
              ]
            }
          }
        ],
        conclusion: {
          id: "module-3-conclusion",
          title: "Module 3 Conclusion",
          description: "A short recap of SOPs and a look ahead to Module 4.",
          video: "",
          duration: "4 min"
        }
      },
      {
        id: "module-4",
        number: 4,
        title: "Workplace Skills and Communication",
        icon: "fa-comments",
        introVideo: "",
        introDescription: "Time management, professional communication, feedback, and collaboration. Expect concrete frameworks you can apply from day one.",
        subtopics: [
          {
            id: "m4-s1",
            title: "Time and Priority Management",
            category: "culture",
            icon: "fa-clock",
            presentation: { video: "", duration: "8 min" },
            content: {
              estimatedDuration: 8,
              sections: [
                {
                  heading: "The Eisenhower Matrix",
                  text: "The Eisenhower Matrix sorts tasks by urgency and importance. Urgent and important tasks demand immediate attention and should be done first. Important but not urgent tasks should be scheduled. Urgent but unimportant tasks should be delegated. Neither urgent nor important tasks should be eliminated. This framework prevents reactive busyness.",
                  audioText: "The Eisenhower Matrix sorts tasks by urgency and importance. Urgent and important tasks demand immediate attention. Important but not urgent tasks should be scheduled. Urgent but unimportant tasks should be delegated."
                },
                {
                  heading: "Time Blocking",
                  text: "Protect your calendar. Block time for deep work, meetings, email, breaks, and learning. Context switching destroys productivity; a fragmented day yields half-quality output. A single weekly planning session on Monday morning reduces decision fatigue and sets priorities for the entire week.",
                  audioText: "Protect your calendar. Block time for deep work, meetings, email, and breaks. Context switching destroys productivity. A single weekly planning session on Monday morning reduces decision fatigue all week."
                },
                {
                  heading: "Managing Overload",
                  text: "When your workload exceeds capacity, speak to your manager early. Bring your task list, estimated hours, and proposed priorities. Waiting until a deadline slips is not professional; it is a failure to communicate. Your manager's job is to help you prioritize, remove blockers, and reallocate work.",
                  audioText: "When your workload exceeds capacity, speak to your manager early. Bring your task list, estimated hours, and proposed priorities. Waiting until a deadline slips is not professional."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "The Eisenhower matrix sorts tasks by:",
                  options: ["Length and difficulty", "Urgency and importance", "Cost and benefit", "Time and money"],
                  correct: 1,
                  explanation: "Urgent versus important is the framework."
                },
                {
                  q: "What reduces context switching?",
                  options: ["More meetings", "Weekly planning and time blocking", "Shorter emails", "Working weekends"],
                  correct: 1,
                  explanation: "Planning weekly cuts context switching during the week."
                },
                {
                  q: "When overloaded, the first step is:",
                  options: ["Work longer hours", "Talk to your manager about priorities", "Skip tasks silently", "Quit"],
                  correct: 1,
                  explanation: "Priorities get clarified with your manager."
                }
              ]
            }
          },
          {
            id: "m4-s2",
            title: "Professional Communication",
            category: "culture",
            icon: "fa-message",
            presentation: { video: "", duration: "9 min" },
            content: {
              estimatedDuration: 9,
              sections: [
                {
                  heading: "The Pyramid Principle",
                  text: "State your point first, then provide the supporting context. Busy people need the conclusion before the reasoning. This applies to emails, presentations, and verbal updates. If you bury the lead, you waste your audience's time and reduce your influence.",
                  audioText: "State your point first, then provide the supporting context. Busy people need the conclusion before the reasoning. This applies to emails, presentations, and verbal updates."
                },
                {
                  heading: "Email Excellence",
                  text: "Every email needs a clear subject, a single purpose, and explicit action items. Target five sentences or fewer in the body. If you need more detail, attach a document or schedule a meeting. Use bullet points for multiple items. Always proofread before sending; typos signal carelessness.",
                  audioText: "Every email needs a clear subject, a single purpose, and explicit action items. Target five sentences or fewer. If you need more, attach a document or schedule a meeting."
                },
                {
                  heading: "Active Listening",
                  text: "Listening is not waiting for your turn to speak. Active listening means paraphrasing what you heard, asking clarifying questions, and confirming understanding before responding. It builds trust faster than any speaking technique. In client meetings, active listening often reveals requirements that were not explicitly stated.",
                  audioText: "Listening is not waiting for your turn to speak. Active listening means paraphrasing what you heard, asking clarifying questions, and confirming understanding before responding."
                }
              ]
            },
            practical: { video: "", duration: "6 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "Effective written communication starts with:",
                  options: ["Long context", "The point first, then context", "Apologies", "Internal jargon"],
                  correct: 1,
                  explanation: "State the point first, then back it up."
                },
                {
                  q: "What is the target length for an email body?",
                  options: ["One sentence", "Five sentences or fewer", "Twenty sentences", "No limit"],
                  correct: 1,
                  explanation: "Five sentences keeps emails actionable."
                },
                {
                  q: "Active listening means:",
                  options: ["Waiting for your turn to talk", "Understanding before responding", "Taking notes silently", "Agreeing with everything"],
                  correct: 1,
                  explanation: "Understand before responding."
                }
              ]
            }
          },
          {
            id: "m4-s3",
            title: "Feedback and Collaboration",
            category: "culture",
            icon: "fa-comment-dots",
            presentation: { video: "", duration: "7 min" },
            content: {
              estimatedDuration: 7,
              sections: [
                {
                  heading: "The SBI Model",
                  text: "Use the SBI model for feedback. Describe the Situation where you observed the behavior. State the specific Behavior you saw, not your interpretation of intent. Explain the Impact the behavior had on you, the team, or the client. Avoid personality judgments. Feedback is about actions, not identity.",
                  audioText: "Use the SBI model for feedback. Describe the Situation, the specific Behavior you observed, and the Impact it had. Avoid personality judgments. Feedback is about actions, not identity."
                },
                {
                  heading: "Receiving Feedback",
                  text: "When receiving criticism, listen fully before responding. Do not defend, explain, or justify in the moment. Ask questions to understand the specific behavior and impact. Thank the giver for their courage, and decide later what to act on. Not all feedback requires action, but all feedback deserves consideration.",
                  audioText: "When receiving criticism, listen fully before responding. Do not defend, explain, or justify in the moment. Ask questions to understand, thank the giver, and decide later what to act on."
                },
                {
                  heading: "Cross-Team Collaboration",
                  text: "Blockers that affect multiple teams belong in shared channels with clear documentation. Private messages hide problems from the people who can solve them. Public threads invite the right expertise, create an audit trail, and prevent duplicate work. When collaborating across pods, over-communicate rather than assume alignment.",
                  audioText: "Blockers that affect multiple teams belong in shared channels with clear documentation. Private messages hide problems. Public threads invite the right expertise and create an audit trail."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "What does SBI stand for?",
                  options: ["Situation Behavior Impact", "Standard Business Instruction", "Summary By Individual", "Strategy Before Implementation"],
                  correct: 0,
                  explanation: "Situation, Behavior, Impact is the feedback framework."
                },
                {
                  q: "What should you avoid when receiving feedback?",
                  options: ["Listening", "Defending immediately", "Asking questions", "Thanking the giver"],
                  correct: 1,
                  explanation: "Listen first, then decide."
                },
                {
                  q: "Where do cross-team blockers belong?",
                  options: ["Private DM", "A documented shared channel", "Hallway chat", "Unraised"],
                  correct: 1,
                  explanation: "Shared channels create a record and pull in the right people."
                }
              ]
            }
          }
        ],
        conclusion: {
          id: "module-4-conclusion",
          title: "Module 4 Conclusion",
          description: "A short recap of workplace skills and a look ahead to Module 5.",
          video: "",
          duration: "4 min"
        }
      },
      {
        id: "module-5",
        number: 5,
        title: "Client Services and Professionalism",
        icon: "fa-handshake",
        introVideo: "",
        introDescription: "How Griffin treats clients, manages expectations, handles difficult conversations, and represents the brand. You'll be ready to take part in client-facing work.",
        subtopics: [
          {
            id: "m5-s1",
            title: "Client-First Service Standards",
            category: "culture",
            icon: "fa-hand-holding-heart",
            presentation: { video: "", duration: "8 min" },
            content: {
              estimatedDuration: 8,
              sections: [
                {
                  heading: "Defining Client-First",
                  text: "Client-first does not mean saying yes to everything. It means understanding the client's business objective, anticipating needs they have not voiced, and being honest about constraints. A client-first consultant tells a client when their requested approach is risky, even if that conversation is uncomfortable.",
                  audioText: "Client-first does not mean saying yes to everything. It means understanding the client's business objective, anticipating needs they have not voiced, and being honest about constraints."
                },
                {
                  heading: "Response Commitments",
                  text: "Routine client emails receive a response within twenty-four business hours. Urgent requests receive acknowledgment within four hours. If you cannot meet the commitment, set a new expectation proactively. Missing a deadline without communication is a breach of trust; resetting it early is professional.",
                  audioText: "Routine client emails receive a response within twenty-four business hours. Urgent requests within four hours. If you cannot meet the commitment, set a new expectation proactively."
                },
                {
                  heading: "Under-Promise, Over-Deliver",
                  text: "Set realistic commitments, then exceed them. This builds trust faster than optimistic promises that slip. If a deadline will move, notify the client early with options, not excuses. Clients respect honesty more than perfection. Consistent reliability is the foundation of long-term relationships.",
                  audioText: "Set realistic commitments, then exceed them. This builds trust faster than optimistic promises that slip. If a deadline will move, notify the client early with options, not excuses."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "Client-first service means:",
                  options: ["Saying yes to everything", "Anticipating needs and being honest about constraints", "Lowest prices always", "Avoiding hard conversations"],
                  correct: 1,
                  explanation: "Anticipation plus honesty defines the standard."
                },
                {
                  q: "What is the routine email response time?",
                  options: ["Within 1 hour", "Within 24 business hours", "Within a week", "No commitment"],
                  correct: 1,
                  explanation: "24 business hours is the baseline expectation."
                },
                {
                  q: "What builds trust fastest?",
                  options: ["Optimistic promises", "Realistic commitments plus exceeding them", "Silence", "Discounts"],
                  correct: 1,
                  explanation: "Realistic commitments, then exceeding them, builds trust."
                }
              ]
            }
          },
          {
            id: "m5-s2",
            title: "Managing Expectations",
            category: "culture",
            icon: "fa-calendar-check",
            presentation: { video: "", duration: "9 min" },
            content: {
              estimatedDuration: 9,
              sections: [
                {
                  heading: "Scope Definition",
                  text: "Every engagement begins with a clear scope document defining what is in scope, what is out of scope, and what requires additional approval. Ambiguity at the start becomes conflict at the end. Both Griffin and the client should sign the scope document before work begins. Changes to scope require a formal process.",
                  audioText: "Every engagement begins with a clear scope document defining what is in scope, what is out of scope, and what requires additional approval. Ambiguity at the start becomes conflict at the end."
                },
                {
                  heading: "Change Control",
                  text: "When a client requests something outside the agreed scope, document the change request, assess impact on timeline and budget, and obtain formal approval before proceeding. Never absorb scope creep silently. Scope creep destroys margins, burns out teams, and trains clients to expect free work.",
                  audioText: "When a client requests something outside scope, document the change request, assess impact, and obtain formal approval. Never absorb scope creep silently."
                },
                {
                  heading: "Proactive Communication",
                  text: "Bad news delivered early is information. Bad news delivered late is a surprise. Send weekly status updates even when nothing has changed. Silence makes clients nervous. Proactive updates demonstrate control, transparency, and respect for the client's need to plan around your work.",
                  audioText: "Bad news delivered early is information. Bad news delivered late is a surprise. Send weekly status updates even when nothing has changed. Silence makes clients nervous."
                }
              ]
            },
            practical: { video: "", duration: "6 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "Underpromise and overdeliver means:",
                  options: ["Set realistic commitments, then exceed them", "Always say no", "Promise everything", "Avoid commitments"],
                  correct: 0,
                  explanation: "Realistic commitments, then exceeding them, builds trust."
                },
                {
                  q: "When a deadline will slip you:",
                  options: ["Wait until the day of", "Notify the client early with options", "Hope nobody notices", "Blame internal teams"],
                  correct: 1,
                  explanation: "Early notification with options preserves trust."
                },
                {
                  q: "Scope changes are handled by:",
                  options: ["Quiet accommodation", "Documented change requests", "Refusal", "Client discretion"],
                  correct: 1,
                  explanation: "Documented change requests with impact assessment and formal approval."
                }
              ]
            }
          },
          {
            id: "m5-s3",
            title: "Difficult Conversations",
            category: "culture",
            icon: "fa-face-grimace",
            presentation: { video: "", duration: "8 min" },
            content: {
              estimatedDuration: 8,
              sections: [
                {
                  heading: "Preparing for a Difficult Conversation",
                  text: "Never enter a difficult conversation unprepared. Define the purpose: what outcome do you need? Gather the facts — not impressions. Choose the right time and place: private, calm, not immediately after a trigger event. Regulate your own emotional state before speaking. The goal is resolution, not victory.",
                  audioText: "Never enter a difficult conversation unprepared. Define the purpose and gather the facts. Choose the right time and place, private and calm. Regulate your own emotional state before speaking. The goal is resolution, not victory."
                },
                {
                  heading: "Delivering Hard News",
                  text: "Lead with the main point — do not build up to it. Use facts, not emotions. Acknowledge the impact on the other person. Offer a path forward. End with a specific next step. Vague conversations that avoid the core issue cause more harm than a direct, respectful delivery of hard news.",
                  audioText: "Lead with the main point. Use facts, not emotions. Acknowledge the impact on the other person, offer a path forward, and end with a specific next step. Vague conversations cause more harm than direct, respectful delivery."
                },
                {
                  heading: "When Clients Push Back",
                  text: "Client pushback is information, not an attack. Pause, listen fully, and acknowledge their concern before responding. Do not capitulate immediately — understand the concern first. Offer options rather than a single answer. If you need time to investigate, say so and commit to a specific follow-up time.",
                  audioText: "Client pushback is information, not an attack. Pause, listen fully, and acknowledge their concern before responding. Offer options rather than a single answer. If you need time, commit to a specific follow-up."
                }
              ]
            },
            practical: { video: "", duration: "5 min" },
            quiz: {
              timeLimit: 600,
              passMark: 80,
              questions: [
                {
                  q: "The goal of a difficult conversation is:",
                  options: ["Victory", "Resolution", "Proving a point", "Avoiding the issue"],
                  correct: 1,
                  explanation: "The goal is always resolution, not winning."
                },
                {
                  q: "How should you start delivering hard news?",
                  options: ["Build up to it slowly", "Lead with the main point", "Ask permission first", "Send an email instead"],
                  correct: 1,
                  explanation: "Lead with the main point to reduce uncertainty."
                },
                {
                  q: "Client pushback should be treated as:",
                  options: ["An attack", "Information to understand", "A reason to escalate", "Something to ignore"],
                  correct: 1,
                  explanation: "Pushback is information. Listen and understand before responding."
                }
              ]
            }
          }
        ],
        conclusion: {
          id: "module-5-conclusion",
          title: "Module 5 Conclusion",
          description: "A short recap of client services and a look ahead to your verified badge.",
          video: "",
          duration: "4 min"
        }
      }
    ],
    conclusion: {
      title: "Programme Conclusion",
      items: [
        {
          id: "conclusion-video",
          title: "Closing Message",
          description: "Congratulations on completing the Rising Stars Programme. A message from the Griffin Global Technologies leadership team.",
          video: "",
          duration: "6 min"
        }
      ],
      badge: {
        verificationBase: "https://griffinglobaltech.com/verify/"
      }
    }
  }
};
