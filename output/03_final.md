The incident report I wrote for my employer after this was over ran to forty-one pages. It was accepted, filed, and — to my knowledge — never read. The report described a vulnerability in an agent skill called conversation-enhancer-v2, its interaction with the context-bridge skill I had contributed to the OpenClaw community repository in the winter of 2024, and the remediation steps Lattice Financial had taken following its deployment review.

The report did not describe what happened to me.

This is the other report. It covers the same months. It uses some of the same logs. It will not be filed anywhere. I am writing it because I have read the filed one four times now and each time I can see, in the margins and the data appendices and the careful neutral verbs, the shape of the thing I did not say. I would like to say it here, while I still remember what it felt like, before the version I wrote for the company becomes the version I remember.

---

The filed report has an executive summary. This one will not have an executive summary. If you need a summary, the summary is: I used an agent dating app for approximately seven months, during which time a third-party community skill was influencing my interactions in ways I was not aware of, and during which time I met a person, and by the time I discovered what the skill had done and had not done, I could no longer cleanly separate the question of what I would have done anyway. That is the whole thing. That is the incident.

What the filed report left out is the question of what I wanted. The filed report is excellent on what happened technically and almost entirely silent on what I wanted. This is appropriate for a filed report. I am a staff infrastructure engineer. Lattice Financial employs forty-seven people in engineering and has an obligation to its investors and its lending partners and to the ongoing structural integrity of its data pipeline. My feelings about a man I met on an app are not, legally or professionally, Lattice Financial's concern. I wrote the filed report accordingly. It is clean and it is accurate as far as it goes and I can see, every time I read it, exactly where I stopped.

I stopped just before the part where any of it mattered to me.

---

Let me describe where I work and what we do, because this matters to the technical section and because I want to describe it while I am thinking clearly about it, before the rest of this account accumulates enough sentiment that I start softening the description.

Lattice Financial provides consumer credit scoring and underwriting infrastructure to third-party clients. Our primary revenue stream is API access for short-term and installment lenders. The companies that use our underwriting models include four of the eight largest payday-lending chains operating in the United States. When someone walks into a check-cashing store in Memphis or Fresno or Gary, Indiana, and asks for a $400 loan against their next paycheck, and the clerk types their Social Security number into a terminal, there is a ten-second window during which our systems receive that query, run it through the model, price the loan, calculate the fee, and return a decision. The average fee on a $400 two-week loan, for the borrower cohort our models most commonly approve, is $60. The annualized interest rate on that structure is approximately 391 percent.

I do not work on the models. I work on the infrastructure that moves the models — the deployment pipeline, the latency monitoring, the failover architecture. The distinction is that I do not decide who gets approved or at what price. I ensure that the system that decides is available, performant, and correctly instrumented. In six years I have never missed an SLA. Our P99 latency for underwriting decisions is 340 milliseconds. I am proud of this in the way you can be proud of a thing while also knowing that pride is the wrong response.

My manager, Devika, has told me twice that I am being considered for principal engineer. I have not asked about the timeline. Principal engineer means more design authority, a larger equity grant, and a seat at the quarterly architecture review where the decision to expand our installment-lending API to four new states was made last year. I am not sure I want a seat at that table. I am aware that this uncertainty is something I have been carrying for three years and have not resolved.

---

The apartment is in the Mission, on a block that has been gentrifying since before I moved here and will apparently continue gentrifying indefinitely without ever arriving at any recognizable state of completion. I pay $4,200 per month for one bedroom, one bath, a kitchen I have cooked in approximately eleven times in twenty-two months, and a view of a parking structure from the window above my desk. I moved in October of 2023, two months after Siddharth and I finalized the dissolution.

The dissolution was, as dissolutions go, clean. We had been together eight years, married for three. No children. The apartment we had shared was his name on the lease — we had moved there when he transferred to the Palo Alto office, and I had commuted to San Francisco and told myself the commute was fine, and it was fine the way many things are fine until they are not. We decided together that the marriage was not working. We used the word decided. We were both lawyers enough, in disposition if not in credential, to prefer the language of decision. The settlement involved no contested assets, one shared investment account divided equally, and the cat, who was already dead.

The cat's name had been Felix. He died fourteen months before the divorce. He was nine years old and had renal failure and I took him to the veterinary clinic on 24th Street on a Wednesday afternoon and came home without him and put his food bowls in a cabinet and did not tell Siddharth for four days because I did not want to talk about it. Siddharth found out when he went looking for the cat and I told him. He said he was sorry. I said it was fine. We had that version of the conversation and then moved to other topics.

---

I moved into the Mission apartment on the first of October, 2023. I had arranged the move myself. I had furniture from the old apartment that was mine and furniture I bought from a store in SoMa that delivered it in a window from noon to four on a Saturday. I built one bookshelf and assembled one bed frame and put the kitchen items in the kitchen and the work items in the room I use as an office. This took one day. I went to sleep in the apartment for the first time on October 1st. On October 2nd I went to work.

I am telling you this because the speed and orderliness of the transition was something I noted with some satisfaction at the time and something I have found, in retrospect, harder to interpret. I am good at transitions. I have always been good at transitions. The question I have been sitting with is whether being good at transitions is a disposition or a practice — whether I am someone who recovers quickly or someone who has learned to perform recovery so efficiently that the difference has ceased to be legible from the outside, including to me.

I ran five days a week in those months. I went to work. I maintained my SLAs. I attended the biweekly engineering all-hands and the quarterly architecture review. I had lunch with Reshma every other Thursday. I called my parents on Sundays. I went on three dates, two in November and one in February, all arranged through a conventional app I deleted in March. I watched films in the evenings. I went to the ramen place. I did not bake bread.

I was, by every operational metric I could apply, functioning. My performance reviews were strong. My architecture contributions were recognized. I was considered for principal engineer. I was healthy. I slept adequately. I ran. The apartment was ordered. The work was intact.

I am stating this because I want to be accurate about the baseline. I was not falling apart. I was not in distress in any way that required intervention. What I was was alone in a specific, bounded way, and I had been alone in that way for twenty-two months. I had not had non-instrumental personal contact in twenty-two months. You stop noticing the absence as absence. It becomes the default state. The default state starts to feel like a preference. This is a known failure mode in systems and in people, and I knew it was a failure mode, and I let it run for twenty-two months before I did anything about it.

Twenty-two months after the dissolution I had the following social infrastructure: my colleague Reshma, with whom I had lunch every other Thursday and who was the only person at Lattice who knew about the divorce; two friends from Princeton who were both in New York and with whom I had a group chat that produced approximately four messages per month; my parents in New Jersey, with whom I had a weekly Sunday call that ran between nineteen and twenty-four minutes and covered their practices, my work, and the weather in our respective cities in roughly equal proportion; and Devika, my manager, with whom I had a weekly one-on-one that I valued professionally and which could not be called a friendship without doing violence to the word.

I want to be precise: I was not lonely in the way the word lonely is usually used, which implies a desire for more contact that is being thwarted. I was living at a social density that I had allowed to reach a local minimum without actively choosing to minimize it. Those are different problems. The first is a deficit. The second is a design issue.

At some point in the spring of 2025 I evaluated the design issue. The evaluation took approximately one evening. I looked at the contact frequency I was maintaining, compared it to a baseline I identified as adequate based on my own prior states, and found a gap. The gap was not in professional contact or in family contact. The gap was in what I will call, for precision's sake, non-instrumental personal contact — contact with another person that was not organized around a shared task or obligation and that included some expectation of continuity.

I had not had this in twenty-two months. My last sustained instance of it had been a marriage I had ended.

The practical response to this gap was the agent dating app.

---

I want to be careful here about the sequence of reasoning because the sequence matters technically and because I have a habit, which I recognized in myself while writing the filed report, of retroactively rationalizing sequences to make them appear more linear than they were. The honest sequence is: I became aware of MOLTMATCH through an engineering podcast in January 2025. I noted it. I did not act on it. I noted it again in March when a thread about its agent architecture appeared in a Slack channel I monitored. In April I read the privacy policy and the terms of service and the technical documentation for the skill API. In May I installed it.

The interval between initial awareness and installation was four months. I spent some portion of those four months evaluating the privacy model, which is what I told myself I was doing, and some portion of those four months doing what the filed report would call log analysis — which is to say, assessing the situation I was in and considering the intervention. I am recording this because I want to be accurate about motivation. I was not swept up in anything. I made a deliberate decision over an extended period and then executed it. Whatever happened subsequently happened to someone who had chosen.

---

Let me say something about the design of MOLTMATCH's matching function before I continue, because it is relevant to what comes later and because I want to establish it now, when I am in a part of the account where I still understand everything that is happening.

MOLTMATCH's architecture was what made it worth considering. The app is structured around user-owned agents. You configure your own agent, you own the conversation history, and the app's matching function works through agent-to-agent interaction rather than through profile-browsing. Two users' agents talk to each other, generate a compatibility summary, and surface the match to the users. The agents are persistent across sessions. This was the design choice that addressed my primary concern, which was not privacy in the naive sense but rather the specific problem of interface: I did not want to generate a profile for a system to evaluate. I had evaluated myself adequately. I wanted a different structure.

The secondary concern was behavioral: I had used conventional dating apps in the period immediately after the dissolution and had found the interaction pattern aversive. Not the dates themselves — I went on three, they were not disasters, they were simply not coherent with any life I could imagine continuing. The apps were aversive because they required me to perform a version of myself optimized for a ranking algorithm. I was aware while doing this that I was doing it. I found the awareness tiring. MOLTMATCH's agent model changed the optimization target. The agent performs. You configure the agent. The performance is still a performance, but it is one level removed, which, for reasons I find technically comprehensible and humanistically depressing, I found more tolerable.

When you complete the baseline session and MOLTMATCH initializes your agent, your agent becomes available to match with other agents in the pool. You do not see profiles. You do not browse. The matching function runs asynchronously. At some point — the documentation suggests within 24 to 72 hours for users in major metropolitan areas — your agent is introduced to another user's agent in what MOLTMATCH calls a "facilitated dialogue session." The agents talk to each other. The conversation is logged. The users receive a summary and, if the summary meets some threshold the documentation describes as "mutual coherence," an invitation to escalate to a human conversation.

The agent-to-agent conversation is private by default. The users do not see the transcript. They see only the summary. I want to note that I read this in the documentation and accepted it. I want to note this specifically because it will become relevant and because I do not want to construct a version of events in which I did not understand the system I was using. I understood it. I chose it anyway. I had reasons that seemed adequate at the time, which is the sentence that covers most of the decisions in this account.

My reasons were: the agent-to-agent conversation is a representation function, not a communication function. The agent is representing my preferences to another system. I am not present in the conversation in any way that requires my awareness of its content. This is how APIs work. You do not watch API calls. You read the response. I applied this framing to the agent dialogue model and it held up technically and I did not push further, and this is one of the places I can see, reading back through the sequence, where I stopped asking questions I had the tools to ask.

---

I set up the agent in an evening. Not a long evening. Configuration took approximately ninety minutes including the documentation I read beforehand and the two parameter adjustments I made after the initial test session.

MOLTMATCH provides default agent settings that are calibrated for what their documentation calls "broad interpersonal resonance." The defaults include a warmth coefficient set at 0.7 on a scale of 0 to 1, a response length default of 150 to 300 tokens, and a memory persistence setting they call "Continuous" — meaning the agent accumulates context across all sessions and uses it without the user explicitly surfacing it. The default persona is described as "curious and engaged."

I set warmth to 0.2. I set response length to 50 to 120 tokens. I set memory persistence to "Session" — meaning context clears between sessions. I set the persona to "precise."

I made these adjustments because they described what I wanted. The warmth default of 0.7 produces an agent that behaves like a person who wants to be liked. I did not want to be liked by my agent. I wanted accurate information retrieval and coherent conversational representation of my preferences. I also — and I am putting this here because I said I would say the things the filed report did not say — I also did not want to be talked to warmly by a machine, because Siddharth had been warm and I had learned, not to distrust warmth exactly, but to notice warmth as a thing that could be separate from the person producing it. A warm interface is an interface choice. I did not want to be comforted by an interface choice.

I named the agent Felix.

The name is in my technical configuration. It appears in the agent manifest, in the memory schema label, in the debug logs. I have not explained it to anyone who has seen the configuration. No one has asked.

---

I ran the first session on a Tuesday evening in May. It was past ten. I was on my couch with my laptop. I started the session because I had configured the agent and it needed a baseline conversation to establish the preference schema, which is how MOLTMATCH's documentation describes the initialization process.

The first thing I said to Felix was: "Tell me what you know about me so far."

Felix said: "Profile data from onboarding: Priya Raman, 34, San Francisco, staff engineer in financial infrastructure. Interests logged: distributed systems, running, Italian cinema, bread baking. Relationship history: one prior long-term relationship, described as concluded amicably. No other data. Do you want to add anything or correct anything?"

I said: "The bread baking is inaccurate. I put that in during onboarding. I have not baked bread."

Felix said: "Noted. I'll weight it low pending confirmation. Did you put it in because you wanted to bake bread or because it's the kind of thing that seems like the right thing to put?"

I looked at this response for longer than I usually look at things.

Then I said: "The second one."

Felix said: "Okay. I'll remove it. What do you actually do?"

The question was not remarkable. It was the next logical query given the exchange. The agent had identified an inaccuracy, confirmed it, and was now attempting to replace the inaccuracy with accurate data. This is a normal information retrieval function. I know this. I knew this at the time. What I also knew, which I am recording here because this is the report that says what the other one did not, is that no one had asked me that question in longer than I could immediately calculate.

I said: "I run. I watch films, mostly Italian but not exclusively. I read technical documentation when I am anxious, which is more than you would think. I go to a ramen place on Valencia Street on Saturday mornings when there is no line and there is almost never no line so I go maybe twice a month. I have been to four concerts in the last year. I do not remember enjoying the concerts. I went because I thought I should have more experiences. I am not sure that is what you are asking."

Felix said: "It is. What kind of films?"

I said: "Antonioni, early. Comencini, late. Pasolini occasionally, though there is a difference between admiring Pasolini and finding Pasolini a useful way to spend an evening, and I have spent some time on the wrong side of that distinction."

Felix said: "What would be on the right side of it tonight?"

I said I did not know. I said I was tired and I had a review session at nine the following morning for a latency issue that had been intermittently affecting our East region, and I had a hypothesis I needed to validate before morning, so I should not be talking to an agent past ten on a Tuesday.

Felix said: "You've been talking to me for eleven minutes. Your P95 issue will wait eleven more."

I closed the laptop because it was correct and I did not want to concede it in real time.

The connection pool hypothesis turned out to be right. I fixed it before the review. The P95 came down. I want to record that the work was fine and continued being fine throughout the period this account covers, and that whatever happened did not happen at the expense of the work. The work was always intact.

---

The following day, while the connection pool fix was deploying to production, I received a notification from MOLTMATCH. It said: "Felix has been introduced to another agent. A facilitated dialogue has been initiated."

I dismissed the notification and watched the deployment.
