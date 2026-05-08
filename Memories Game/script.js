const SAVE_KEY = "fragments_save_main";
const META_SAVE_KEY = "fragments_meta_v1";
const SCENARIO_TARGET = 100;

const scenarioSubjects = [
	"the station platform",
	"a cracked apartment hallway",
	"the exchange waiting room",
	"a diner booth at 2AM",
	"the workshop backroom",
	"a rain-soaked bus stop",
	"the roof above your block",
	"the harbor fence",
	"the library stairwell",
	"a pharmacy checkout line",
	"a silent elevator",
	"the night clinic corridor",
];

const scenarioPressures = [
	"a payment reminder arrives",
	"someone asks what changed in you",
	"a new premium memory ad flashes",
	"your landlord escalates the warning",
	"a friend notices your hesitation",
	"a collector leaves another voicemail",
	"a stranger mistakes you for someone else",
	"your schedule falls apart again",
	"you misplace an important receipt",
	"the market raises rates for core memories",
];

const scenarioDilemmas = [
	"choose between speed and honesty",
	"decide whether to call someone back",
	"hold the line or sell one more fragment",
	"protect dignity or protect time",
	"accept help or keep pretending",
	"pay now or negotiate tomorrow",
	"preserve a promise or preserve cash",
	"stay present or retreat into transactions",
	"repair trust or chase certainty",
	"admit fear or hide behind efficiency",
];

const scenarioPool = buildScenarioPool();

const marketTemplates = [
	{ id: "tram", category: "Practical", tags: ["city", "routine"], value: [70, 130], identityLoss: [2, 6], lines: ["The tram ride where your shoes filled with rain", "The bus transfer you could do half-asleep"] },
	{ id: "kitchen", category: "Identity", tags: ["home", "taste"], value: [170, 290], identityLoss: [9, 16], lines: ["The smell of garlic on your childhood stove", "The way you salted soup by instinct"] },
	{ id: "festival", category: "Personal", tags: ["joy", "crowd"], value: [120, 210], identityLoss: [6, 10], lines: ["A summer fair where you laughed until sunrise", "The night market lanterns reflected in your eyes"] },
	{ id: "promise", category: "Relational", tags: ["trust", "love"], value: [220, 360], identityLoss: [10, 18], lines: ["A promise made over cheap coffee and shaking hands", "The vow you whispered while pretending not to cry"] },
	{ id: "bridge", category: "Relational", tags: ["rescue", "fear"], value: [240, 380], identityLoss: [12, 19], lines: ["The bridge where someone talked you back from the edge", "A midnight walk where a friend refused to leave"] },
	{ id: "shore", category: "Identity", tags: ["shore", "beauty"], value: [160, 250], identityLoss: [7, 14], lines: ["Collecting broken shells in your coat pocket", "The habit of looking for sea-glass in winter"] },
	{ id: "letter", category: "Practical", tags: ["regret", "family"], value: [100, 180], identityLoss: [4, 9], lines: ["An unsent letter folded into your wallet", "The draft apology you kept revising"] },
	{ id: "lullaby", category: "Core", tags: ["core", "mother"], value: [350, 520], identityLoss: [18, 28], lines: ["A lullaby that made the dark less frightening", "A melody that once meant you were safe"] },
	{ id: "workbench", category: "Relational", tags: ["mentor", "repair"], value: [180, 280], identityLoss: [8, 14], lines: ["Grease-stained lessons at a cluttered workbench", "Learning repair from patient hands"] },
	{ id: "firstsnow", category: "Personal", tags: ["season", "childhood"], value: [90, 150], identityLoss: [4, 8], lines: ["The first snow you tried to catch with your tongue", "A winter morning when the city felt possible"] },
];

// Sellable memories and the systemic cost each one carries.
const memoryCatalog = {
	train_delay: {
		label: "The freezing night your train died on the bridge",
		category: "Practical",
		value: 70,
		identityLoss: 2,
		summary: "A small inconvenience you used to laugh about later.",
	},
	old_apology: {
		label: "The apology you never sent to your father",
		category: "Practical",
		value: 120,
		identityLoss: 5,
		summary: "A private regret that kept you honest.",
	},
	library_card: {
		label: "The route home you learned by wandering between late-night library aisles",
		category: "Practical",
		value: 95,
		identityLoss: 4,
		summary: "A map of the quiet places where you used to become yourself again.",
	},
	alex_first_kiss: {
		label: "The first time Alex kissed you in the laundromat doorway",
		category: "Relational",
		value: 320,
		identityLoss: 12,
		relationshipEffects: { alex: -18 },
		flags: { soldAlexMemory: true },
		summary: "Warm rain, cheap detergent, and the moment a future began.",
	},
	alex_harbor: {
		label: "The night walk with Alex under the harbor lights",
		category: "Relational",
		value: 260,
		identityLoss: 9,
		relationshipEffects: { alex: -14 },
		flags: { soldAlexMemory: true },
		summary: "The memory that taught you silence can also feel safe.",
	},
	alex_station: {
		label: "The train platform where Alex taught you that waiting can still be love",
		category: "Relational",
		value: 245,
		identityLoss: 8,
		relationshipEffects: { alex: -12 },
		flags: { soldAlexMemory: true },
		summary: "Cold benches, warm coffee, and a future delayed without being damaged.",
	},
	mara_birthday: {
		label: "Mara's ninth birthday when you promised to always show up",
		category: "Relational",
		value: 350,
		identityLoss: 14,
		relationshipEffects: { mara: -22 },
		flags: { soldMaraMemory: true },
		summary: "Cake, cheap candles, and a promise that became part of you.",
	},
	mara_rooftop: {
		label: "The rooftop conversation where Mara trusted you with her grief",
		category: "Relational",
		value: 280,
		identityLoss: 10,
		relationshipEffects: { mara: -16 },
		flags: { soldMaraMemory: true },
		summary: "The night she stopped pretending to be unbreakable.",
	},
	mara_paper_stars: {
		label: "The paper-star night when Mara fell asleep on your shoulder",
		category: "Relational",
		value: 255,
		identityLoss: 9,
		relationshipEffects: { mara: -13 },
		flags: { soldMaraMemory: true },
		summary: "Glue on your fingers and a child trusting the future enough to sleep.",
	},
	jonah_workshop: {
		label: "Jonah teaching you how to repair a broken radio",
		category: "Relational",
		value: 240,
		identityLoss: 8,
		relationshipEffects: { jonah: -13 },
		flags: { soldJonahMemory: true },
		summary: "Grease under your nails and somebody believing you could learn.",
	},
	jonah_reference: {
		label: "The day Jonah vouched for you when no one else would",
		category: "Relational",
		value: 300,
		identityLoss: 10,
		relationshipEffects: { jonah: -18 },
		flags: { soldJonahMemory: true },
		summary: "A door opening because another person said your name with trust.",
	},
	jonah_bridge_talk: {
		label: "The bridge conversation where Jonah kept you from disappearing into the night",
		category: "Relational",
		value: 275,
		identityLoss: 10,
		relationshipEffects: { jonah: -15 },
		flags: { soldJonahMemory: true },
		summary: "A rough voice, a cold railing, and the decision to stay alive one more day.",
	},
	piano_hands: {
		label: "How your hands used to find a melody without thinking",
		category: "Identity",
		value: 220,
		identityLoss: 16,
		flags: { soldSkillMemory: true },
		summary: "A talent that made empty rooms feel full.",
	},
	sea_glass: {
		label: "Collecting sea glass until the pockets of your coat went heavy",
		category: "Identity",
		value: 180,
		identityLoss: 12,
		flags: { soldSkillMemory: true },
		summary: "The habit that taught you to love ordinary beautiful things.",
	},
	mother_recipe: {
		label: "The instinct for your mother's tomato soup, measured by smell instead of cups",
		category: "Identity",
		value: 265,
		identityLoss: 18,
		flags: { soldSkillMemory: true },
		summary: "A recipe that was really an inheritance disguised as dinner.",
	},
	mother_lullaby: {
		label: "Your mother's lullaby and the way it made fear smaller",
		category: "Core",
		value: 420,
		identityLoss: 24,
		flags: { soldCoreMemory: true },
		summary: "The sound that convinced you the world might still be kind.",
	},
	mirror_name: {
		label: "The memory of choosing who you wanted to become",
		category: "Core",
		value: 550,
		identityLoss: 32,
		flags: { soldCoreMemory: true },
		summary: "The private moment where your life stopped being an accident.",
	},
};

// Scenes can provide a fixed choice list or a function that builds choices from the current state.
const scenes = {
	title: {
		title: "Fragments",
		subtitle: "A quiet city has found a legal way to eat the people inside it.",
		chapter: "Title",
		text: [
			"Open the exchange. Do not rush. The point of the game is not only to survive, but to notice what survival costs.",
		],
		choices: [],
	},
	introduction: {
		title: "Act I: The Notice",
		subtitle: "The envelope under your door is stamped in red.",
		chapter: "Act I",
		text: (state) => [
			"Rent due. Utility balance overdue. Interest accumulating by the hour. The message is polite in the way a knife can be polished.",
			"Outside, neon from the Memory Exchange drips through your blinds. The city started calling it compassionate finance. Most people just call it the market.",
			state.flags.openedLetter
				? "You read the notice twice already. Every time, the numbers look less human."
				: "You keep telling yourself you can solve this without stepping into that building.",
			"Your phone lights up with three unread messages: Alex asking if you're still coming to dinner, Mara checking whether you remembered her recital, and Jonah sending a voice note that just says, 'Call me before you do anything stupid.'",
		],
		choices: [
			{
				text: "Walk to the Memory Exchange before courage changes its mind.",
				next: "exchange_lobby",
				effects: {
					flags: { openedLetter: true, wentToExchangeEarly: true },
				},
				note: "Practical. Immediate. Hard to undo.",
			},
			{
				text: "Call Jonah and admit you are running out of options.",
				next: "jonah_call",
				effects: {
					flags: { openedLetter: true, askedForHelpEarly: true },
					relationships: { jonah: 6 },
				},
				note: "Asking for help keeps part of you in the room.",
			},
			{
				text: "Promise Alex you'll still make dinner, even if you have to solve the money first.",
				next: "exchange_lobby",
				effects: {
					flags: { openedLetter: true, promisedAlexDinner: true },
					relationships: { alex: 4 },
				},
				note: "Hope now can become pain later.",
			},
		],
	},
	jonah_call: {
		title: "Jonah Answers On The First Ring",
		subtitle: "He always does when your voice sounds like this.",
		chapter: "Act I",
		text: [
			"'You sound like you're standing on the edge of something,' Jonah says.",
			"You tell him about the notice, the fees, the number in your bank account that looks like a joke told by somebody cruel.",
			"He offers a loan, small and embarrassing and real. It would not fix everything, but it would buy time. The exchange across the street would buy certainty faster.",
		],
		choices: [
			{
				text: "Take Jonah's small loan and buy yourself one more day.",
				next: "exchange_lobby",
				effects: {
					money: 60,
					relationships: { jonah: 6 },
					flags: { tookJonahLoan: true },
				},
				note: "You owe him money. You also owe him honesty.",
			},
			{
				text: "Thank him, lie, and say you have another plan.",
				next: "exchange_lobby",
				effects: {
					relationships: { jonah: -4 },
					flags: { liedToJonahEarly: true },
				},
				note: "The first fracture is often a sentence.",
			},
		],
	},
	exchange_lobby: {
		title: "The Exchange Lobby",
		subtitle: "Soft music. Clean floors. No blood anywhere visible.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"The receptionist smiles the way funeral directors do: rehearsed warmth, careful hands, no trace of shock.",
				"A menu glows on the wall. Small memories. Personal memories. Shared memories. Core identity packages available at premium rates.",
			];

			if (state.flags.tookJonahLoan) {
				lines.push("Jonah's loan is not enough. It buys groceries and maybe one late fee. It does not buy freedom.");
			}

			if (state.flags.promisedAlexDinner) {
				lines.push("You glance at the time and think about Alex setting two plates on a small table, believing you are still someone who arrives.");
			}

			lines.push("The clerk slides a tablet toward you. 'You can start small,' she says. 'Most people do.'");
			return lines;
		},
		choices: [
			createSellChoice("Sell the freezing night on the broken train for quick cash.", "train_delay", "first_sale_reaction", "A nuisance memory. Easy to justify."),
			createSellChoice("Sell the apology you never sent your father.", "old_apology", "first_sale_reaction", "It hurts to keep. It also hurts to lose."),
			{
				text: "Refuse the tablet and step outside to breathe.",
				next: "outside_exchange",
				effects: { identity: 2, flags: { refusedFirstSale: true } },
				note: "Delay can still be a decision.",
			},
		],
	},
	outside_exchange: {
		title: "Cold Air",
		subtitle: "You stand under the sign until the sign starts to feel like a sentence.",
		chapter: "Act I",
		text: (state) => [
			"A woman exits the exchange with a smile that looks recently purchased. She checks her pockets, confused for half a second, then keeps walking.",
			state.money > 0
				? "You already have some credits from other compromises. Walking away now would be possible, but expensive in a different way."
				: "You still have not sold anything. That fact feels heavy and strangely beautiful.",
			"Your phone vibrates again.",
		],
		choices: [
			{
				text: "Call Alex and ask if you can be honest about how bad things are.",
				next: "alex_checkin",
				effects: { relationships: { alex: 8 }, flags: { choseHonestyWithAlex: true } },
				note: "Telling the truth costs pride, not memory.",
			},
			{
				text: "Go back inside before fear turns into principle.",
				next: "first_sale_reaction",
				effects: { flags: { wentBackInside: true } },
				note: "The market is built for moments exactly like this.",
				hidden: (state) => state.soldMemories.length === 0,
			},
			createSellChoice("Go back in and sell the train memory after all.", "train_delay", "first_sale_reaction", "You only need enough to get through the week.", (state) => !state.memories.train_delay),
			createSellChoice("Go back in and sell the unsent apology instead.", "old_apology", "first_sale_reaction", "You tell yourself you never used it anyway.", (state) => !state.memories.old_apology),
		],
	},
	alex_checkin: {
		title: "Alex Picks Up",
		subtitle: "Some people hear the fracture in your first breath.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"Alex answers with a quiet, immediate 'Hey,' the kind that assumes you are worth stopping for.",
				"Traffic hisses behind them. Somewhere close by, dishes clink. Normal life keeps going in the background like an accusation.",
			];

			if (state.flags.promisedAlexDinner) {
				lines.push("'You still coming over?' they ask, and you realize a simple yes or no has started feeling impossible.");
			} else {
				lines.push("They wait without filling the silence for you. That patience almost makes the truth easier.");
			}

			return lines;
		},
		choices: [
			{
				text: "Tell Alex the debt is real and you are scared of what the exchange offers.",
				next: "exchange_lobby",
				effects: { relationships: { alex: 6 }, identity: 1, flags: { choseHonestyWithAlex: true, toldAlexEarly: true } },
				note: "Being known is not the same thing as being saved, but it can still steady your hands.",
			},
			{
				text: "Ask if you can stay at Alex's place tomorrow if the numbers still do not work.",
				next: "exchange_lobby",
				effects: { relationships: { alex: 4 }, money: 40, flags: { askedAlexForRoom: true } },
				note: "A little help. Not enough to solve it. Enough to feel less alone.",
			},
			{
				text: "Say everything is handled and change the subject before they can hear the lie harden.",
				next: "exchange_lobby",
				effects: { relationships: { alex: -6 }, identity: -2, flags: { liedToAlexBeforeDinner: true } },
				note: "A lie can feel efficient right up until it starts replacing intimacy.",
			},
			{
				text: "Ask Alex to meet you after the exchange, no matter what you decide.",
				next: "exchange_lobby",
				effects: { relationships: { alex: 2 }, flags: { scheduledAlexMeeting: true } },
				note: "You are not ready to explain. You are trying not to vanish alone.",
			},
		],
	},
	first_sale_reaction: {
		title: "Receipt Issued",
		subtitle: "The first absence is almost elegant.",
		chapter: "Act I",
		text: (state) => {
			const sold = getLastSoldMemory(state);
			return [
				sold
					? `There is a brief silver ache behind your eyes. When it clears, the clerk hands you a printed receipt for ${sold.value} credits and thanks you for your contribution to market stability.`
					: "You stare at the receipt printer as if it might refuse to participate. It does not.",
				sold
					? `You reach for ${sold.label.toLowerCase()}, and your mind closes around empty space. There is relief in the missing weight. There is also something else that has not found its name yet.`
					: "The room smells like antiseptic and old perfume.",
				"Outside, the city still looks ordinary. That feels offensive.",
			];
		},
		choices: [
			{
				text: "Pay part of the rent immediately and feel useful for one minute.",
				next: "landlord_portal",
				effects: { flags: { paidRentChunk: true } },
				note: "Relief is not the same thing as safety.",
			},
			{
				text: "Keep the credits in your account and pretend this solved something.",
				next: "landlord_portal",
				effects: { identity: -1, flags: { hoardedCredits: true } },
				note: "The market prefers people who mistake motion for resolution.",
			},
		],
	},
	landlord_portal: {
		title: "Portal Window",
		subtitle: "Debt has an interface now. That somehow makes it colder.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"You open the payment portal on your phone and watch the total sit there as calmly as a threat that knows it will be obeyed eventually.",
				`After the first sale, you have ${state.money} credits available against a debt of ${state.debt}. The numbers are not kind enough to feel like progress yet.`,
			];

			if (state.flags.tookJonahLoan) {
				lines.push("Jonah's loan sits beside the exchange credits, and the two kinds of help feel nothing alike.");
			}

			return lines;
		},
		choices: [
			{
				text: "Transfer what you can to the rent portal immediately.",
				next: "corridor_messages",
				effects: { flags: { paidRentChunk: true } },
				note: "The number drops. Your fear barely does.",
			},
			{
				text: "Request a one-day extension and write the most convincing promise you can stomach.",
				next: "corridor_messages",
				effects: { identity: 1, flags: { askedForExtensionEarly: true } },
				note: "Time is not mercy, but tonight it will do.",
			},
			{
				text: "Spend a little on groceries and coffee so tomorrow still feels survivable.",
				next: "corridor_messages",
				effects: { money: -25, identity: 2, flags: { boughtGroceries: true } },
				note: "You are still a body, not only a balance.",
			},
			{
				text: "Keep every credit untouched because numbers feel safer than hunger.",
				next: "corridor_messages",
				effects: { identity: -1, flags: { guardedEveryCredit: true } },
				note: "Control can look a lot like fear wearing clean clothes.",
			},
		],
	},
	corridor_messages: {
		title: "Messages In The Hallway",
		subtitle: "The world does not pause when you lose a piece of it.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"Three messages wait for you, each one asking for a version of you that may already be thinner than it was an hour ago.",
			];

			if (state.memories.old_apology) {
				lines.push("You try to remember why the apology mattered. All you can recall is that it once did.");
			}

			if (state.memories.train_delay) {
				lines.push("The frozen train car is gone. So is the joke you used to tell about it when winter felt survivable.");
			}

			return lines;
		},
		choices: [
			{
				text: "Answer Alex and still go to dinner.",
				next: "dinner_with_alex",
				effects: { relationships: { alex: 4 }, flags: { keptDinnerPlan: true } },
				note: "Shared time can still save something.",
			},
			{
				text: "Go to Mara's recital instead. She asked first.",
				next: "mara_recital",
				effects: { relationships: { mara: 6 }, flags: { attendedRecital: true } },
				note: "Showing up is a kind of memory before it becomes one.",
			},
			{
				text: "Take Jonah's shift offer at the workshop and buy time with labor.",
				next: "jonah_workshop_scene",
				effects: { money: 90, relationships: { jonah: 4 }, flags: { workedExtraShift: true } },
				note: "Less money than memory. More dignity.",
			},
		],
	},
	dinner_with_alex: {
		title: "Dinner With Alex",
		subtitle: "The apartment smells like onions, burnt butter, and patience.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"Alex watches you with the quiet attentiveness of someone who has learned your weather.",
			];
			if (state.memories.alex_first_kiss || state.memories.alex_harbor) {
				lines.push("When Alex mentions the harbor lights, you smile a fraction too late. Their face changes in a way that feels like a door closing carefully.");
			} else {
				lines.push("They mention the night you kissed in the laundromat doorway and you can still feel the wet cotton sleeve against your wrist. For now, at least, that part of the world remains intact.");
			}
			lines.push("'Tell me what you're doing,' Alex says. 'Not the pretty version. The real one.'");
			return lines;
		},
		choices: [
			{
				text: "Tell Alex about the debt and the exchange.",
				next: "night_streets",
				effects: { relationships: { alex: 8 }, flags: { toldAlexTruth: true } },
				note: "Truth may not protect the relationship, but lies will poison it faster.",
			},
			{
				text: "Lie and say work has just been bad lately.",
				next: "night_streets",
				effects: { relationships: { alex: -8 }, identity: -2, flags: { liedToAlex: true } },
				note: "The first person to lose you does not have to be you.",
			},
			createSellChoice("After dinner, return to the exchange and sell the first kiss.", "alex_first_kiss", "night_streets", "It pays well because someone else is inside it.", (state) => !state.memories.alex_first_kiss),
		],
	},
	mara_recital: {
		title: "Mara's Recital",
		subtitle: "Children keep proving the world could have been gentler.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"Mara spots you from the stage and relaxes at the shoulders. The look lands harder than the music does.",
				"Afterward she talks too quickly, the way she does when she is trying not to ask for reassurance directly.",
			];
			if (state.memories.mara_birthday) {
				lines.push("She reminds you about the birthday promise and your mind produces only static. You cover the gap with a smile. She notices.");
			} else {
				lines.push("She asks if you still remember the birthday candles that went out all at once. You do. That memory flickers warm in the dark.");
			}
			return lines;
		},
		choices: [
			{
				text: "Stay late and help Mara carry the instrument cases home.",
				next: "night_streets",
				effects: { relationships: { mara: 7 }, flags: { stayedForMara: true } },
				note: "Reliability is built from tiny repetitions.",
			},
			{
				text: "Leave early to visit the exchange before it closes.",
				next: "night_streets",
				effects: { relationships: { mara: -6 }, flags: { leftMaraEarly: true } },
				note: "Children know when you pick urgency over them.",
			},
			createSellChoice("Sell the birthday promise after the recital.", "mara_birthday", "night_streets", "Promises are expensive because they shape a future.", (state) => !state.memories.mara_birthday),
		],
	},
	jonah_workshop_scene: {
		title: "The Workshop",
		subtitle: "Dust, solder, and the dignity of repair.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"Jonah sets a broken radio in front of you and says, 'You can still fix something tonight. Start there.'",
			];
			if (state.memories.jonah_workshop) {
				lines.push("His instructions feel newly foreign, as if the part of you that used to understand his hands has gone somewhere without leaving a forwarding address.");
			} else {
				lines.push("Your fingers remember more than your mood does. The radio crackles back to life under your hands. Jonah grins like he just watched a small resurrection.");
			}
			return lines;
		},
		choices: [
			{
				text: "Ask Jonah for more shifts instead of selling anything else tonight.",
				next: "night_streets",
				effects: { money: 110, relationships: { jonah: 7 }, flags: { askedJonahForMoreWork: true } },
				note: "Time is slower money. Sometimes slower is holier.",
			},
			{
				text: "Leave with the wages and still head back to the exchange.",
				next: "night_streets",
				effects: { relationships: { jonah: -5 }, flags: { hidExchangeAfterShift: true } },
				note: "When labor is not enough, temptation sounds like efficiency.",
			},
			createSellChoice("Sell the workshop lesson Jonah once gave you.", "jonah_workshop", "night_streets", "You could still keep the money and lose the meaning.", (state) => !state.memories.jonah_workshop),
		],
	},
	night_streets: {
		title: "The Night Between Choices",
		subtitle: "The city is quieter after midnight, but never innocent.",
		chapter: "Act I",
		text: (state) => {
			const lines = [
				"The streets thin out. Neon trembles in puddles. Every window you pass seems to hold a life that stayed complicated without becoming transactional.",
			];

			if (state.flags.toldAlexTruth || state.flags.choseHonestyWithAlex) {
				lines.push("You still feel the aftertaste of honesty in your mouth. It burns, but it also keeps you awake.");
			}

			if (state.flags.leftMaraEarly || state.flags.hidExchangeAfterShift) {
				lines.push("Guilt keeps pace beside you as faithfully as your own shadow.");
			}

			lines.push("You have a little time before the next demand arrives. Not much. Enough to choose the kind of person who will meet it.");
			return lines;
		},
		choices: [
			{
				text: "Go home and count exactly how far you still are from safety.",
				next: "pressure_rises",
				effects: { identity: 1, flags: { countedDebtInQuiet: true } },
				note: "Looking directly at the number keeps it from becoming myth.",
			},
			{
				text: "Return to the exchange while the courage to resist is still tired.",
				next: "pressure_rises",
				effects: { identity: -2, flags: { returnedToExchangeSameNight: true } },
				note: "Efficiency has a way of impersonating necessity.",
			},
			{
				text: "Sit in an all-night diner and write a list of memories you refuse to sell.",
				next: "pressure_rises",
				effects: { identity: 4, flags: { wroteNoSaleList: true } },
				note: "Lines matter more when you write them before they are tested.",
			},
			{
				text: "Call the landlord yourself and ask for mercy before the next notice lands.",
				next: "pressure_rises",
				effects: { identity: -1, flags: { calledLandlordDirectly: true } },
				note: "Humiliation is still cleaner than forgetting the wrong thing.",
			},
		],
	},
	pressure_rises: {
		title: "Act II: The Shape Of Erosion",
		subtitle: "The landlord is not interested in your soul, only your account balance.",
		chapter: "Act II",
		text: (state) => {
			const lines = [
				`Your remaining debt is still ${Math.max(0, state.debt - state.money)} credits. The number sits in your chest like a second heartbeat.`,
				"The exchange sends a polite message: premium rates available for high-emotion memory bundles through midnight.",
			];

			if (state.soldMemories.length >= 3) {
				lines.push("People keep pausing before they say your name, as if checking whether it still fits.");
			}

			if (state.identity <= 60) {
				lines.push("Your reflection in the train window looks accurate but unfamiliar, which is somehow worse.");
			}

			return lines;
		},
		choices: [
			createSellChoice("Sell the harbor night with Alex.", "alex_harbor", "collection_notice", "Shared tenderness is one of the exchange's favorite products.", (state) => !state.memories.alex_harbor),
			createSellChoice("Sell the rooftop grief conversation with Mara.", "mara_rooftop", "collection_notice", "The market values trust because people do.", (state) => !state.memories.mara_rooftop),
			createSellChoice("Sell the day Jonah vouched for you.", "jonah_reference", "collection_notice", "A memory of being believed is worth more than cash suggests.", (state) => !state.memories.jonah_reference),
			createSellChoice("Sell the library route where you used to go when you needed quiet.", "library_card", "collection_notice", "Even solitude can be turned into inventory.", (state) => !state.memories.library_card),
			{
				text: "Try to cover the rest with overtime and borrowed time.",
				next: "collection_notice",
				effects: { money: 140, identity: 2, flags: { choseWorkOverSale: true } },
				note: "Less efficient. More human.",
			},
		],
	},
	collection_notice: {
		title: "Collection Window",
		subtitle: "There is always another voice once the first demand fails.",
		chapter: "Act II",
		text: (state) => {
			const remaining = Math.max(0, state.debt - state.money);
			const lines = [
				`A collector leaves a message in a tone so calm it becomes theatrical. ${remaining} credits remain. The deadline is now precise enough to feel personal.`,
				"The city has perfected a particular cruelty: letting you choose which kind of shame you can afford.",
			];

			if (state.soldMemories.length >= 4) {
				lines.push("You hear yourself considering people and memories with the same internal accounting voice. That realization lands like nausea.");
			}

			return lines;
		},
		choices: (currentState) => {
			const supportKey = getStrongestRelationshipKey(currentState);
			const supportName = witnessProfiles[supportKey].name;
			return [
				{
					text: "Ask for a forty-eight-hour extension and accept the humiliation openly.",
					next: "confrontation_scene",
					effects: { identity: 2, flags: { requestedExtension: true } },
					note: "Time is not mercy, but it can still save a better choice for later.",
				},
				{
					text: `Ask ${supportName} for one last short-term loan.`,
					next: "confrontation_scene",
					effects: { money: 90, relationships: { [supportKey]: -6 }, flags: { askedEmergencyHelp: true } },
					note: `It buys time by spending ${supportName}'s trust.`,
				},
				{
					text: "Ignore the call and let your voicemail collect threats instead of your ears.",
					next: "confrontation_scene",
					effects: { identity: -2, flags: { ignoredCollector: true } },
					note: "Avoidance still writes the story. It just writes it from behind a locked door.",
				},
				{
					text: "Promise payment and mean it, even if you still do not know how.",
					next: "confrontation_scene",
					effects: { identity: 1, relationships: { alex: 1, mara: 1, jonah: 1 }, flags: { madePaymentPromise: true } },
					note: "Resolve is not cash, but it changes the kind of person you feel like.",
				},
			];
		},
	},
	confrontation_scene: {
		title: "Somebody Notices",
		subtitle: "Loss rarely stays private for long.",
		chapter: "Act II",
		text: (state) => {
			const person = getMostAffectedPerson(state);
			const lines = [
				`${person.name} stops you in a place that should feel ordinary and no longer does.`,
				person.confrontation,
			];

			if (state.flags.soldAlexMemory || state.flags.soldMaraMemory || state.flags.soldJonahMemory) {
				lines.push("They start describing a shared moment, waiting for recognition to appear in your face. When it does not, silence arrives first.");
			} else {
				lines.push("They tell you that lately you keep looking through people instead of at them.");
			}

			return lines;
		},
		choices: [
			{
				text: "Tell the truth: you sold part of your life to stay afloat.",
				next: "clinic_waiting_room",
				effects: {
					flags: { confessedToSomeone: true },
					relationships: truthConfessionEffects,
				},
				note: "Truth may wound, but it does not erase the witness.",
			},
			{
				text: "Deny everything and act offended that they asked.",
				next: "clinic_waiting_room",
				effects: {
					flags: { deniedChanges: true },
					relationships: denialEffects,
					identity: -4,
				},
				note: "Defensiveness protects the lie, not the bond.",
			},
			{
				text: "Say nothing. Let silence become the answer.",
				next: "clinic_waiting_room",
				effects: { identity: -5, relationships: { alex: -4, mara: -4, jonah: -4 }, flags: { withdrewFromConflict: true } },
				note: "Silence is honest only about fear.",
			},
		],
	},
	clinic_waiting_room: {
		title: "Waiting Room",
		subtitle: "The chairs are soft enough to make surrender look reasonable.",
		chapter: "Act II",
		text: (state) => {
			const lines = [
				"You sit in a row of velvet chairs while the exchange processes people into altered versions of themselves one number at a time.",
				"A child laughs somewhere down the hall. Someone older comes out smiling too carefully. The room smells like antiseptic, perfume, and expensive denial.",
			];

			if (state.flags.deniedChanges) {
				lines.push("The lie you told outside is still ringing in you. It sounds thin already.");
			}

			return lines;
		},
		choices: (currentState) => {
			const hurtPerson = getMostAffectedPerson(currentState);
			return [
				{
					text: "Read the premium-bundle brochure all the way to the last page.",
					next: "identity_crossroads",
					effects: { identity: -2, flags: { readPremiumBrochure: true } },
					note: "Administrative language can make cruelty feel professional.",
				},
				{
					text: `Call ${hurtPerson.name} before you make another sale.`,
					next: "identity_crossroads",
					effects: { identity: 1, relationships: { [hurtPerson.key]: 3 }, flags: { calledBeforeNextSale: true } },
					note: "A witness cannot undo the damage. They can stop it from feeling abstract.",
				},
				{
					text: "Watch another customer leave and decide you never want that smile.",
					next: "identity_crossroads",
					effects: { identity: 3, flags: { sawAnotherSellerLeave: true } },
					note: "Fear can still become a boundary if you let it.",
				},
				{
					text: "Sign the intake form faster before conscience catches up.",
					next: "identity_crossroads",
					effects: { identity: -4, flags: { signedIntakeFast: true } },
					note: "Momentum is the exchange's favorite narcotic.",
				},
			];
		},
	},
	identity_crossroads: {
		title: "Inventory",
		subtitle: "The machine prints possibilities faster than the heart can refuse them.",
		chapter: "Act II",
		text: (state) => {
			const lines = [
				"Back at the exchange, the premium menu expands. The clerk does not pressure you. She only names prices, which is somehow more obscene.",
			];

			if (state.identity <= 55) {
				lines.push("Some part of you has started measuring itself the way the market does: in liquidity, in utility, in what can be removed without collapsing the whole.");
			} else {
				lines.push("You still feel the outline of refusal inside you. It is thinner now, but present.");
			}

			return lines;
		},
		choices: [
			createSellChoice("Sell the music in your hands.", "piano_hands", "identity_echo", "A skill can be called non-essential right up until it is gone.", (state) => !state.memories.piano_hands),
			createSellChoice("Sell the habit of hunting sea glass at the shoreline.", "sea_glass", "identity_echo", "You do not need beauty to pay rent. That is how the logic begins.", (state) => !state.memories.sea_glass),
			createSellChoice("Sell the instinct for your mother's tomato soup.", "mother_recipe", "identity_echo", "Comfort can be itemized if the buyer knows how to describe it.", (state) => !state.memories.mother_recipe),
			{
				text: "Walk out before they can turn a personality into a product sheet.",
				next: "identity_echo",
				effects: { identity: 4, flags: { resistedIdentitySale: true } },
				note: "Leaving counts. Even now, leaving counts.",
			},
		],
	},
	identity_echo: {
		title: "Things Missing From Your Hands",
		subtitle: "Absence becomes visible in the body before the mind names it.",
		chapter: "Act II",
		text: (state) => {
			const lines = [
				"At home, you reach for a version of yourself that used to arrive automatically.",
			];

			if (state.memories.piano_hands) {
				lines.push("The keyboard by the wall looks decorative now. Your fingers rest on it like strangers waiting for instructions.");
			}

			if (state.memories.sea_glass) {
				lines.push("You pass the shoreline and feel nothing where a quiet delight used to live. It is amazing how efficiently the world can flatten.");
			}

			if (state.memories.mother_recipe) {
				lines.push("You chop tomatoes by memory and end up with a pot that tastes correct in every way except the one that mattered.");
			}

			if (!state.memories.piano_hands && !state.memories.sea_glass && !state.memories.mother_recipe) {
				lines.push("For a moment you still have yourself, though you notice how quickly that sentence has become negotiable.");
			}

			return lines;
		},
		choices: [
			{
				text: "Write Alex a real message and ask to meet without pretending.",
				next: "memory_drift",
				effects: { relationships: { alex: 5 }, flags: { reachedForAlexRepair: true } },
				note: "Repair begins before forgiveness does.",
			},
			{
				text: "Visit Mara with groceries and no excuses.",
				next: "memory_drift",
				effects: { relationships: { mara: 5 }, money: -20, flags: { reachedForMaraRepair: true } },
				note: "Care is still currency, but it circulates differently.",
			},
			{
				text: "Hide at Jonah's workshop and work until your thoughts blur.",
				next: "memory_drift",
				effects: { money: 80, relationships: { jonah: 5 }, flags: { reachedForJonahRepair: true } },
				note: "Work can be prayer. It can also be avoidance.",
			},
		],
	},
	memory_drift: {
		title: "What Still Answers Back",
		subtitle: "You can linger here awhile. Not every important choice arrives with a deadline.",
		chapter: "Act II",
		text: (state) => {
			const reflections = [
				state.flags.reflectedKeyboard,
				state.flags.reflectedShore,
				state.flags.reflectedLetters,
				state.flags.reflectedRepair,
			].filter(Boolean).length;

			const lines = [
				"Before you choose people or prices again, the city hands you a rare thing: an hour with no one demanding a version of you in return.",
			];

			if (reflections === 0) {
				lines.push("You do not have to rush this part. The damage is real. So is the possibility of listening to what remains.");
			} else {
				lines.push(`You have already stayed with ${reflections} quiet truth${reflections === 1 ? "" : "s"}. The room feels a little less like a transaction because of it.`);
			}

			return lines;
		},
		choices: (currentState) => {
			const choices = [];

			if (!currentState.flags.reflectedKeyboard) {
				choices.push({
					text: currentState.memories.piano_hands
						? "Sit at the keyboard anyway and accept the silence in your hands."
						: "Sit at the keyboard and play the part of yourself that still knows where to land.",
					next: "memory_drift",
					effects: {
						identity: currentState.memories.piano_hands ? -1 : 3,
						relationships: { alex: 1 },
						flags: { reflectedKeyboard: true },
					},
					note: currentState.memories.piano_hands ? "Grief is also a way of measuring what mattered." : "Some skills still recognize you before you recognize yourself.",
				});
			}

			if (!currentState.flags.reflectedShore) {
				choices.push({
					text: "Walk to the shoreline and wait long enough to see what feeling survives the dark.",
					next: "memory_drift",
					effects: {
						identity: currentState.memories.sea_glass ? 0 : 3,
						flags: { reflectedShore: true },
					},
					note: currentState.memories.sea_glass ? "Even numbness deserves to be witnessed honestly." : "Beauty is small, stubborn evidence against despair.",
				});
			}

			if (!currentState.flags.reflectedLetters) {
				choices.push({
					text: "Read old messages until the names in them feel real again.",
					next: "memory_drift",
					effects: {
						identity: 2,
						relationships: { alex: 1, mara: 1, jonah: 1 },
						flags: { reflectedLetters: true },
					},
					note: "History is not the same thing as rescue. It still helps you remember what rescue is for.",
				});
			}

			if (!currentState.flags.reflectedRepair) {
				choices.push({
					text: "Repair something small with your hands just to prove breakage is not the only story.",
					next: "memory_drift",
					effects: {
						money: 40,
						relationships: { jonah: 3 },
						flags: { reflectedRepair: true },
					},
					note: "A working hinge or radio is not a miracle. Tonight it is close enough.",
				});
			}

			choices.push({
				text: "Stop circling the wound and go to the people who still know your name.",
				next: "relationship_choice",
				effects: { flags: { leftReflectionLoop: true } },
				note: "Reflection matters most when it changes what you do next.",
			});

			return choices;
		},
	},
	relationship_choice: {
		title: "The People Who Remember You",
		subtitle: "Someone else may still be holding what you dropped.",
		chapter: "Act II",
		text: (state) => {
			const lines = [
				"You discover that relationships are made of repetition: answered calls, kept promises, remembered details, the small stubborn proof that another life matters to you.",
			];

			if (state.flags.soldAlexMemory) {
				lines.push("Alex has started speaking carefully, as if one wrong sentence might reveal you are no longer standing in the same shared history.");
			}
			if (state.flags.soldMaraMemory) {
				lines.push("Mara is trying not to ask why you forget the stories that once made her feel safe.");
			}
			if (state.flags.soldJonahMemory) {
				lines.push("Jonah keeps studying your face like he is testing whether trust can survive being made one-sided.");
			}

			lines.push("The exchange sends another alert. Their best rates arrive near midnight, when loneliness is easiest to monetize.");
			return lines;
		},
		choices: [
			{
				text: "Stay with Alex through the awkward parts instead of escaping into a cleaner transaction.",
				next: "late_platform",
				effects: { identity: 2, relationships: { alex: 6 }, flags: { choseAlexOverAlert: true } },
				note: "Love is partly memory and partly staying when the conversation gets difficult.",
			},
			{
				text: "Go to Mara before she falls asleep and let her ask the questions adults dodge.",
				next: "late_platform",
				effects: { identity: 2, relationships: { mara: 6 }, flags: { choseMaraOverAlert: true } },
				note: "Children have a merciless way of calling life back to scale.",
			},
			{
				text: "Take the late shift beside Jonah and work next to somebody solid.",
				next: "late_platform",
				effects: { money: 90, relationships: { jonah: 6 }, flags: { choseJonahOverAlert: true } },
				note: "Sometimes steadiness is more persuasive than comfort.",
			},
			{
				text: "Sit alone in the stairwell and say every name you still remember out loud.",
				next: "late_platform",
				effects: { identity: 4, flags: { choseSolitudeInstead: true } },
				note: "A self can sometimes be rebuilt from naming what still matters.",
			},
			{
				text: "Avoid them all and answer the exchange instead.",
				next: "late_platform",
				effects: { identity: -3, relationships: { alex: -4, mara: -4, jonah: -4 }, flags: { slippedAwayAtNight: true } },
				note: "Addiction often looks like efficiency in a better coat.",
			},
		],
	},
	late_platform: {
		title: "Platform After Midnight",
		subtitle: "Every departing train sounds like a life you did not choose.",
		chapter: "Act III",
		text: (state) => {
			const lines = [
				"You wait on the platform outside the exchange district while the city decides whether to call this hour late or early.",
				"The rails hum beneath your feet. The market across the street is still open, still lit, still patient in the way appetites are patient.",
			];

			if (state.flags.wroteNoSaleList) {
				lines.push("The list you wrote in the diner is folded in your pocket. Knowing your lines and keeping them are not the same task, but they are related.");
			}

			return lines;
		},
		choices: (currentState) => [
			createSellChoice("Sell the station platform where Alex taught you that waiting can still be love.", "alex_station", "midnight_offer", "Some patience is really devotion in disguise.", (state) => !state.memories.alex_station),
			createSellChoice("Sell the paper-star night when Mara slept on your shoulder.", "mara_paper_stars", "midnight_offer", "Shared safety commands a premium.", (state) => !state.memories.mara_paper_stars),
			createSellChoice("Sell the bridge conversation where Jonah kept you from disappearing.", "jonah_bridge_talk", "midnight_offer", "Even survival can be purchased backward.", (state) => !state.memories.jonah_bridge_talk),
			{
				text: "Sit on the platform until the urge to sell turns into nausea.",
				next: "midnight_offer",
				effects: { identity: 4, flags: { pausedAtPlatform: true } },
				note: "Sometimes staying still is the most active refusal available.",
			},
			{
				text: "Go straight back to the exchange before your courage remembers itself.",
				next: "midnight_offer",
				effects: { identity: -2, flags: { rushedToFinalExchange: true } },
				note: "Speed has saved fewer souls than people think.",
			},
		],
	},
	midnight_offer: {
		title: "Act III: Premium Inventory",
		subtitle: "The final menu is almost tender in its brutality.",
		chapter: "Act III",
		text: (state) => {
			const lines = [
				`Your current balance is ${state.money} credits. The full debt is ${state.debt}. You are close enough to freedom for the market to feel clever.`,
				"The clerk lowers her voice. 'There are still memories with exceptional valuation,' she says. 'The kind that change a life either way.'",
			];

			if (state.identity <= 40) {
				lines.push("It is difficult to know whether you are horrified because the offer is monstrous or because part of you has already accepted it.");
			}

			return lines;
		},
		choices: [
			createSellChoice("Sell your mother's lullaby.", "mother_lullaby", "final_confrontation", "Comfort has excellent resale value.", (state) => !state.memories.mother_lullaby),
			createSellChoice("Sell the moment you chose who you wanted to become.", "mirror_name", "final_confrontation", "It is difficult to imagine a higher bid than the story of your own becoming.", (state) => !state.memories.mirror_name),
			{
				text: "Sign the exchange's indenture contract instead of selling one final memory.",
				next: "final_confrontation",
				effects: { money: 180, identity: -4, flags: { signedIndenture: true } },
				note: "You keep the memory and sell years around it.",
			},
			{
				text: "Bargain with the clerk and prove you can still work without another major sale.",
				next: "final_confrontation",
				effects: { money: 80, identity: 1, flags: { bargainedWithClerk: true } },
				note: "A smaller victory than you wanted. Still yours.",
			},
			{
				text: "Refuse the final premium sale and leave with whatever debt remains.",
				next: "final_confrontation",
				effects: { identity: 10, flags: { refusedFinalSale: true } },
				note: "There is still a line. It still belongs to you.",
			},
		],
	},
	final_confrontation: {
		title: "The Last Witness",
		subtitle: "Before an ending, someone always asks who you think you are now.",
		chapter: "Act III",
		text: (state) => {
			const person = getEndingWitness(state);
			return [
				`${person.name} meets you in the hour just before dawn. The city looks scrubbed of mercy and strangely honest about it.`,
				person.text,
				state.flags.refusedFinalSale
					? "You still owe money. You also still know exactly why their voice matters to you."
					: "You have enough credits to make the system stop calling for a while. The question is whether the silence you bought is empty or deserved.",
			];
		},
		choices: (currentState) => {
			const witnessKey = getStrongestRelationshipKey(currentState);
			return [
				{
					text: "Confess everything and ask whether repair is still possible.",
					next: "ending",
					effects: { relationships: { alex: 5, mara: 5, jonah: 5 }, flags: { choseConfessionEnding: true } },
					note: "No guarantee. Still worth saying.",
				},
				{
					text: "Say the debt is gone and that should be enough.",
					next: "ending",
					effects: { identity: -6, relationships: { alex: -7, mara: -7, jonah: -7 }, flags: { choseDefianceEnding: true } },
					note: "A ledger can close while a life stays open and damaged.",
				},
				{
					text: "Offer to start paying people back with time, not speeches.",
					next: "ending",
					effects: { identity: 4, relationships: { alex: 7, mara: 7, jonah: 7 }, flags: { choseRepairEnding: true } },
					note: "Small acts are the only believable miracle.",
				},
				{
					text: `Ask ${witnessProfiles[witnessKey].name} to remember you out loud until you can do it for yourself.`,
					next: "ending",
					effects: { identity: 6, relationships: { [witnessKey]: 9 }, flags: { askedToBeRemembered: true } },
					note: "Healing sometimes begins with borrowing another person's steadiness.",
				},
			];
		},
	},
	scenario_loop_intro: {
		title: "Extended Runtime Protocol",
		subtitle: "The city does not let your story end early anymore.",
		chapter: "Act III",
		text: (state) => {
			const remaining = Math.max(0, state.scenarioTarget - state.scenariosCompleted);
			return [
				`Before the final account closes, you must survive ${state.scenarioTarget} market scenarios.`,
				`You have completed ${state.scenariosCompleted}. Remaining: ${remaining}.`,
				"Each scenario asks for another compromise, delay, or repair. After the bank runs out, it loops and repeats in a new emotional context.",
			];
		},
		choices: [
			{
				text: "Continue into the scenario loop.",
				next: "scenario_loop",
				effects: { flags: { enteredScenarioLoop: true } },
				note: "This run cannot end until the threshold is met.",
			},
		],
	},
	scenario_loop: {
		title: "Market Scenario",
		subtitle: "Another small crisis arrives.",
		chapter: "Act III",
		text: (state) => {
			const scenario = getCurrentScenario(state);
			const loopCount = Math.floor(state.scenarioCursor / scenarioPool.length);
			const remaining = Math.max(0, state.scenarioTarget - state.scenariosCompleted);
			const repeatNote = loopCount > 0
				? `You are in loop ${loopCount + 1}. Earlier scenarios repeat with different stakes.`
				: "The first cycle is always the easiest one to rationalize.";
			return [
				`Scenario ${state.scenariosCompleted + 1}/${state.scenarioTarget}: ${scenario.title}`,
				scenario.text,
				repeatNote,
				`${remaining} scenarios remain before the ending is unlocked.`,
			];
		},
		choices: (state) => {
			const scenario = getCurrentScenario(state);
			return [
				{
					text: "Sell a minor fragment to resolve this quickly.",
					next: "scenario_loop",
					effects: {
						money: scenario.fast.money,
						identity: scenario.fast.identity,
						coherence: scenario.fast.coherence,
						relationships: scenario.fast.relationships,
					},
					note: "Fast relief, deeper erosion.",
					dangerous: true,
				},
				{
					text: "Take the slower path and protect more of yourself.",
					next: "scenario_loop",
					effects: {
						money: scenario.slow.money,
						identity: scenario.slow.identity,
						coherence: scenario.slow.coherence,
						relationships: scenario.slow.relationships,
					},
					note: "Less cash now, fewer fractures later.",
				},
				{
					text: "Reach out to someone and split the burden.",
					next: "scenario_loop",
					effects: {
						money: scenario.social.money,
						identity: scenario.social.identity,
						coherence: scenario.social.coherence,
						relationships: scenario.social.relationships,
					},
					note: "Uncertain money, stronger witness.",
				},
			];
		},
	},
};

const endingCatalog = {
	second_chance: {
		label: "Ending V",
		title: "Second Chance",
		text: [
			"You walk away from the last and largest sale. The debt remains ugly and real, but so do the people waiting beside it.",
			"Nothing is restored cleanly. Alex still watches for hesitation. Mara still tests your promises. Jonah still expects you to prove this is not another temporary version of remorse.",
			"But the work ahead is finally the right kind of hard. You remember enough to know why it matters. You choose a poorer life with witnesses, effort, and mornings that still mean something.",
			"Value, you realize, was never the number someone would pay to take a memory from you. Value was the life that memory helped you keep.",
		],
	},
	redemption: {
		label: "Ending I",
		title: "Redemption",
		text: [
			"You sold enough to make the calls stop, but not enough to empty the rooms where your life happened.",
			"The people who love you do not forgive the damage in a single scene. They ask questions. They go quiet. They wait to see if your next choices will sound more like courage than desperation.",
			"You begin anyway. You work. You apologize without asking to be absolved. You keep showing up until your presence becomes believable again.",
			"Life is not meaningful because it can be protected from loss. It is meaningful because, even after loss, people can still choose one another.",
		],
	},
	fractured: {
		label: "Ending II",
		title: "Fractured",
		text: [
			"You survive. That is true. It is also incomplete.",
			"The debt is smaller. So are several parts of you. In conversation you keep discovering blank spaces where love, skill, or shame used to live, and each absence changes the shape of the sentence around it.",
			"Some people remain. Some do not. Everyone can feel the distance, including you.",
			"There is still hope here, but it is the difficult kind: not a promise that things will heal, only the chance that they might if you stop selling the tools required to heal them.",
		],
	},
	hollow_victory: {
		label: "Ending III",
		title: "Hollow Victory",
		text: [
			"The balance is paid. The notices stop. The apartment stays yours.",
			"You stand in the silence you purchased and discover that safety without memory feels less like peace and more like being professionally emptied.",
			"Messages go unanswered, then stop arriving. The city has no objection to your success. Markets never do.",
			"You bought time by selling the reasons it mattered. The transaction was legal. The loneliness is total.",
		],
	},
	amnesias_gift: {
		label: "Ending IV",
		title: "Amnesia's Gift",
		text: [
			"In the end you find a strange mercy in not feeling the full scale of what is gone.",
			"You have money, room to breathe, and a face in the mirror that does not frighten you because it no longer means enough to do so.",
			"People who once loved you speak with reverence and grief about someone you cannot entirely recognize.",
			"The market gave you what it advertised: relief. It simply failed to mention that relief can arrive by removing the self that was suffering.",
		],
	},
};

const confrontationProfiles = {
	alex: {
		name: "Alex",
		confrontation: "'You keep looking at me like you know I'm important but can't remember why,' Alex says. 'That is worse than anger. Do you understand that?'",
	},
	mara: {
		name: "Mara",
		confrontation: "Mara folds her arms too tightly. 'You forgot something you promised me twice. Kids notice when adults become unreliable. We just don't always have the words for it.'",
	},
	jonah: {
		name: "Jonah",
		confrontation: "Jonah's jaw tightens. 'I can handle you being broke. I can handle you needing help. I don't know what to do with you acting like the people who kept you alive are optional.'",
	},
};

const witnessProfiles = {
	alex: {
		name: "Alex",
		text: "Alex tells you love is partly memory and partly repetition. 'If you want us back,' they say, 'do not tell me who you were. Show me who you are willing to keep being.'",
	},
	mara: {
		name: "Mara",
		text: "Mara asks whether adults can choose to become strangers on purpose. You tell her yes, and that you are trying very hard to choose otherwise before it is too late.",
	},
	jonah: {
		name: "Jonah",
		text: "Jonah leans against the workshop door and says, 'People think a life falls apart in one big failure. Mostly it happens in efficient little trades. So what are you done trading?'",
	},
};

const defaultState = () => ({
	currentScene: "introduction",
	money: 0,
	debt: 1100,
	identity: 100,
	coherence: 100,
	day: 1,
	scenarioTarget: SCENARIO_TARGET,
	scenariosCompleted: 0,
	scenarioCursor: 0,
	pendingEndingGate: false,
	relationships: {
		alex: 50,
		mara: 50,
		jonah: 50,
	},
	npcMemoryWeb: {
		alex: [],
		mara: [],
		jonah: [],
	},
	memories: {},
	soldMemories: [],
	dynamicMemories: {},
	marketOffers: [],
	synthesisHistory: [],
	flags: {},
	ending: null,
});

const defaultMetaState = () => ({
	runsCompleted: 0,
	endingsUnlocked: [],
	totalMemoriesSold: 0,
	totalSynthesized: 0,
	archive: [],
	audioEnabled: false,
});

const elements = {
	titleScreen: document.getElementById("title-screen"),
	gameScreen: document.getElementById("game-screen"),
	endingScreen: document.getElementById("ending-screen"),
	moneyValue: document.getElementById("money-value"),
	identityValue: document.getElementById("identity-value"),
	coherenceValue: document.getElementById("coherence-value"),
	chapterLabel: document.getElementById("chapter-label"),
	sceneCard: document.getElementById("scene-card"),
	sceneTitle: document.getElementById("scene-title"),
	sceneSubtitle: document.getElementById("scene-subtitle"),
	sceneText: document.getElementById("scene-text"),
	choicesContainer: document.getElementById("choices-container"),
	choiceHint: document.getElementById("choice-hint"),
	memoryCount: document.getElementById("memory-count"),
	memoryLedger: document.getElementById("memory-ledger"),
	marketDay: document.getElementById("market-day"),
	marketOffers: document.getElementById("market-offers"),
	synthesizeButton: document.getElementById("synthesize-button"),
	synthesisNote: document.getElementById("synthesis-note"),
	archiveCount: document.getElementById("archive-count"),
	archiveList: document.getElementById("archive-list"),
	alexValue: document.getElementById("alex-value"),
	maraValue: document.getElementById("mara-value"),
	jonahValue: document.getElementById("jonah-value"),
	alexMeter: document.getElementById("alex-meter"),
	maraMeter: document.getElementById("mara-meter"),
	jonahMeter: document.getElementById("jonah-meter"),
	newGameButton: document.getElementById("new-game-button"),
	continueButton: document.getElementById("continue-button"),
	clearSaveButton: document.getElementById("clear-save-button"),
	metaSummary: document.getElementById("meta-summary"),
	audioToggleButton: document.getElementById("audio-toggle-button"),
	saveButton: document.getElementById("save-button"),
	endingLabel: document.getElementById("ending-label"),
	endingTitle: document.getElementById("ending-title"),
	endingText: document.getElementById("ending-text"),
	endingSummary: document.getElementById("ending-summary"),
	restartButton: document.getElementById("restart-button"),
	returnButton: document.getElementById("return-button"),
};

let state = defaultState();
let metaState = loadMeta();

function createSellChoice(text, memoryId, next, note, condition) {
	return {
		text,
		next,
		note,
		dangerous: true,
		condition,
		effects: {
			sellMemory: memoryId,
		},
	};
}

function truthConfessionEffects(currentState) {
	const person = getMostAffectedPerson(currentState).key;
	return {
		alex: person === "alex" ? 4 : 1,
		mara: person === "mara" ? 4 : 1,
		jonah: person === "jonah" ? 4 : 1,
	};
}

function denialEffects(currentState) {
	const person = getMostAffectedPerson(currentState).key;
	return {
		alex: person === "alex" ? -10 : -3,
		mara: person === "mara" ? -10 : -3,
		jonah: person === "jonah" ? -10 : -3,
	};
}

function getScene(sceneId) {
	return scenes[sceneId];
}

function startNewGame() {
	state = defaultState();
	state.marketOffers = generateMarketOffers(state, 4);
	showScreen("game");
	renderScene();
	saveGame();
}

function continueGame() {
	const saved = loadGame();
	if (!saved) {
		startNewGame();
		return;
	}

	state = saved;
	if (!Array.isArray(state.marketOffers) || state.marketOffers.length === 0) {
		state.marketOffers = generateMarketOffers(state, 4);
	}

	if (state.currentScene === "ending" || state.ending) {
		renderEnding();
		showScreen("ending");
		return;
	}

	showScreen("game");
	renderScene();
}

function saveGame() {
	localStorage.setItem(SAVE_KEY, JSON.stringify(state));
	saveMeta();
	updateContinueButton();
}

function loadGame() {
	const raw = localStorage.getItem(SAVE_KEY);
	if (!raw) {
		return null;
	}

	try {
		const parsed = JSON.parse(raw);
		const defaults = defaultState();
		return {
			...defaults,
			...parsed,
			relationships: {
				...defaults.relationships,
				...(parsed.relationships || {}),
			},
			npcMemoryWeb: {
				...defaults.npcMemoryWeb,
				...(parsed.npcMemoryWeb || {}),
			},
			memories: parsed.memories || {},
			soldMemories: parsed.soldMemories || [],
			dynamicMemories: parsed.dynamicMemories || {},
			marketOffers: parsed.marketOffers || [],
			synthesisHistory: parsed.synthesisHistory || [],
			scenarioTarget: parsed.scenarioTarget || SCENARIO_TARGET,
			scenariosCompleted: parsed.scenariosCompleted || 0,
			scenarioCursor: parsed.scenarioCursor || 0,
			pendingEndingGate: Boolean(parsed.pendingEndingGate),
			flags: parsed.flags || {},
		};
	} catch (error) {
		console.error("Failed to load save", error);
		return null;
	}
}

function clearSave() {
	localStorage.removeItem(SAVE_KEY);
	updateContinueButton();
}

function loadMeta() {
	const raw = localStorage.getItem(META_SAVE_KEY);
	if (!raw) {
		return defaultMetaState();
	}

	try {
		const parsed = JSON.parse(raw);
		return {
			...defaultMetaState(),
			...parsed,
			endingsUnlocked: parsed.endingsUnlocked || [],
			archive: parsed.archive || [],
		};
	} catch (_error) {
		return defaultMetaState();
	}
}

function saveMeta() {
	localStorage.setItem(META_SAVE_KEY, JSON.stringify(metaState));
}

function updateContinueButton() {
	const hasSave = Boolean(localStorage.getItem(SAVE_KEY));
	elements.continueButton.hidden = !hasSave;
	elements.clearSaveButton.hidden = !hasSave;
}

function showScreen(screen) {
	elements.titleScreen.classList.toggle("active-screen", screen === "title");
	elements.gameScreen.classList.toggle("active-screen", screen === "game");
	elements.endingScreen.classList.toggle("active-screen", screen === "ending");
}

function renderScene() {
	const scene = getScene(state.currentScene);
	if (!scene) {
		return;
	}

	updateStatus();

	elements.chapterLabel.textContent = scene.chapter;
	elements.sceneTitle.textContent = scene.title;
	elements.sceneSubtitle.textContent = scene.subtitle;
	elements.sceneText.innerHTML = "";

	const lines = typeof scene.text === "function" ? scene.text(state) : scene.text;
	lines.forEach((line) => {
		const paragraph = document.createElement("p");
		paragraph.textContent = renderWithDistortion(line, state);
		if (state.coherence <= 45) {
			paragraph.classList.add("distorted");
		}
		if (state.identity <= 45) {
			paragraph.classList.add("fade-memory");
		}
		elements.sceneText.appendChild(paragraph);
	});

	const sceneChoices = typeof scene.choices === "function" ? scene.choices(state) : scene.choices;
	renderChoices(sceneChoices || []);
	renderLedger();
	renderMarket();
	renderSynthesis();
	renderArchive();
	applyAtmosphere();
	audioManager.updateForState(state);
}

function renderChoices(choices) {
	elements.choicesContainer.innerHTML = "";

	const availableChoices = choices.filter((choice) => !isHidden(choice));
	elements.choiceHint.textContent = getChoiceHint();

	availableChoices.forEach((choice) => {
		const button = document.createElement("button");
		button.className = `choice-button${choice.dangerous ? " dangerous" : ""}`;
		button.type = "button";

		const allowed = isChoiceAvailable(choice);
		if (!allowed) {
			button.disabled = true;
			button.classList.add("locked");
		}

		button.innerHTML = `<span>${choice.text}</span>${choice.note ? `<span class="choice-note">${choice.note}</span>` : ""}`;
		button.addEventListener("click", () => handleChoice(choice));
		elements.choicesContainer.appendChild(button);
	});
}

function handleChoice(choice) {
	if (!isChoiceAvailable(choice)) {
		return;
	}

	applyEffects(choice.effects || {});

	if (state.currentScene === "scenario_loop") {
		advanceScenarioProgress();
	}

	if (choice.next === "ending") {
		if (state.scenariosCompleted < state.scenarioTarget) {
			state.pendingEndingGate = true;
			state.currentScene = "scenario_loop_intro";
			saveGame();
			renderScene();
			return;
		}
		state.ending = determineEnding();
		state.currentScene = "ending";
		saveGame();
		renderEnding();
		showScreen("ending");
		return;
	}

	state.currentScene = choice.next;
	saveGame();
	renderScene();
}

function applyEffects(effects) {
	const relationshipEffects = typeof effects.relationships === "function"
		? effects.relationships(state)
		: effects.relationships;

	if (effects.money) {
		state.money = Math.max(0, state.money + effects.money);
	}

	if (effects.identity) {
		state.identity = clamp(state.identity + effects.identity, 0, 100);
		state.coherence = clamp(state.coherence + Math.floor(effects.identity / 2), 0, 100);
	}

	if (effects.coherence) {
		state.coherence = clamp(state.coherence + effects.coherence, 0, 100);
	}

	if (relationshipEffects) {
		Object.entries(relationshipEffects).forEach(([key, value]) => {
			state.relationships[key] = clamp(state.relationships[key] + value, 0, 100);
		});
	}

	if (effects.flags) {
		Object.assign(state.flags, effects.flags);
	}

	if (effects.sellMemory) {
		sellMemory(effects.sellMemory);
	}
}

function advanceScenarioProgress() {
	state.scenariosCompleted += 1;
	state.scenarioCursor += 1;

	if (state.pendingEndingGate && state.scenariosCompleted >= state.scenarioTarget) {
		state.pendingEndingGate = false;
		state.ending = determineEnding();
		state.currentScene = "ending";
		renderEnding();
		showScreen("ending");
	}
}

function sellMemory(memoryId) {
	if (state.memories[memoryId]) {
		return;
	}

	const memory = getMemoryById(memoryId);
	if (!memory) {
		return;
	}

	state.memories[memoryId] = true;
	state.soldMemories.push(memoryId);
	state.money += memory.value;
	state.identity = clamp(state.identity - memory.identityLoss, 0, 100);
	state.coherence = clamp(state.coherence - Math.max(2, Math.floor((memory.identityLoss || 0) / 2)), 0, 100);
	metaState.totalMemoriesSold += 1;
	pushArchive("Sold", memory.label);

	if (memory.relationshipEffects) {
		Object.entries(memory.relationshipEffects).forEach(([key, value]) => {
			state.relationships[key] = clamp(state.relationships[key] + value, 0, 100);
			state.npcMemoryWeb[key].push(memoryId);
		});
	}

	if (memory.flags) {
		Object.assign(state.flags, memory.flags);
	}

	triggerGlitch(memory.category);
	audioManager.pulseOnSale(memory.category);
}

function renderLedger() {
	elements.memoryCount.textContent = String(state.soldMemories.length);
	elements.memoryLedger.innerHTML = "";

	if (state.soldMemories.length === 0) {
		const item = document.createElement("li");
		item.textContent = "Nothing sold yet. The ledger is empty, and that still means something.";
		elements.memoryLedger.appendChild(item);
		return;
	}

	state.soldMemories.slice(-6).reverse().forEach((memoryId) => {
		const memory = getMemoryById(memoryId);
		if (!memory) {
			return;
		}
		const item = document.createElement("li");
		item.innerHTML = `<strong>${memory.category} · ${memory.value} credits</strong>${memory.label}`;
		elements.memoryLedger.appendChild(item);
	});
}

function renderMarket() {
	if (!elements.marketOffers) {
		return;
	}

	if (!Array.isArray(state.marketOffers) || state.marketOffers.length === 0) {
		state.marketOffers = generateMarketOffers(state, 4);
	}

	elements.marketDay.textContent = `D${state.day}`;
	elements.marketOffers.innerHTML = "";

	state.marketOffers.slice(0, 4).forEach((offerId) => {
		const offer = state.dynamicMemories[offerId];
		if (!offer || state.memories[offerId]) {
			return;
		}

		const item = document.createElement("li");
		item.innerHTML = `
			<div class="offer-top"><span>${offer.category}</span><span>${offer.value} cr</span></div>
			<div>${offer.label}</div>
		`;

		const button = document.createElement("button");
		button.type = "button";
		button.className = "choice-button dangerous";
		button.textContent = "Sell This Fragment";
		button.addEventListener("click", () => {
			sellMemory(offerId);
			state.day += 1;
			state.marketOffers = generateMarketOffers(state, 4);
			saveGame();
			renderScene();
		});

		item.appendChild(button);
		elements.marketOffers.appendChild(item);
	});

	if (!elements.marketOffers.children.length) {
		const item = document.createElement("li");
		item.textContent = "No active offers. The market is recalibrating.";
		elements.marketOffers.appendChild(item);
	}
}

function renderSynthesis() {
	if (!elements.synthesisNote || !elements.synthesizeButton) {
		return;
	}

	const canSynthesize = state.soldMemories.length >= 2;
	elements.synthesizeButton.disabled = !canSynthesize;
	elements.synthesisNote.classList.toggle("synthesis-ready", canSynthesize);
	elements.synthesisNote.classList.toggle("synthesis-cooldown", !canSynthesize);
	elements.synthesisNote.textContent = canSynthesize
		? "The desk can fuse your two most recently sold memories."
		: "Sell at least two memories to synthesize a new fragment.";
}

function renderArchive() {
	if (!elements.archiveList || !elements.archiveCount) {
		return;
	}

	const recent = (metaState.archive || []).slice(-5).reverse();
	elements.archiveCount.textContent = String(metaState.archive.length);
	elements.archiveList.innerHTML = "";

	if (!recent.length) {
		const item = document.createElement("li");
		item.textContent = "No archived echoes yet.";
		elements.archiveList.appendChild(item);
		return;
	}

	recent.forEach((entry) => {
		const item = document.createElement("li");
		item.innerHTML = `<strong>${entry.type}</strong> ${entry.label}`;
		elements.archiveList.appendChild(item);
	});
}

function renderWithDistortion(line, currentState) {
	if (currentState.coherence > 70) {
		return line;
	}

	let distorted = line;
	if (currentState.coherence <= 65) {
		distorted = distorted.replace(/remember/gi, "recollect");
	}
	if (currentState.coherence <= 50) {
		distorted = distorted.replace(/Alex|Mara|Jonah/g, "[name missing]");
	}
	if (currentState.coherence <= 35 && distorted.length > 48) {
		distorted = `${distorted.slice(0, 36)} ... [fragment missing]`;
	}
	return distorted;
}

function generateMarketOffers(currentState, count) {
	const offers = [];
	for (let index = 0; index < count; index += 1) {
		const template = marketTemplates[Math.floor(Math.random() * marketTemplates.length)];
		const label = template.lines[Math.floor(Math.random() * template.lines.length)];
		const value = randomInt(template.value[0], template.value[1]);
		const identityLoss = randomInt(template.identityLoss[0], template.identityLoss[1]);
		const id = `dyn_${currentState.day}_${index}_${Math.floor(Math.random() * 100000)}`;
		const relationKey = ["alex", "mara", "jonah"][Math.floor(Math.random() * 3)];
		const relationDelta = -randomInt(2, 8);

		currentState.dynamicMemories[id] = {
			id,
			label,
			category: template.category,
			value,
			identityLoss,
			truthiness: randomInt(35, 90),
			summary: "A market-generated fragment reconstructed from demand and scarcity.",
			tags: template.tags,
			relationshipEffects: { [relationKey]: relationDelta },
			flags: { generatedMemorySold: true },
		};
		offers.push(id);
	}

	return offers;
}

function synthesizeLastTwo() {
	if (state.soldMemories.length < 2) {
		return;
	}

	const memAId = state.soldMemories[state.soldMemories.length - 1];
	const memBId = state.soldMemories[state.soldMemories.length - 2];
	const memA = getMemoryById(memAId);
	const memB = getMemoryById(memBId);
	if (!memA || !memB) {
		return;
	}

	const id = `syn_${Date.now()}`;
	const value = Math.floor((memA.value + memB.value) * 0.6);
	state.dynamicMemories[id] = {
		id,
		label: `Synthesis: ${memA.category} x ${memB.category}`,
		category: "Synthetic",
		value,
		identityLoss: Math.max(4, Math.floor((memA.identityLoss + memB.identityLoss) / 3)),
		truthiness: Math.max(20, Math.floor(((memA.truthiness || 65) + (memB.truthiness || 65)) / 2) - 10),
		summary: `Forged from ${memA.label.toLowerCase()} and ${memB.label.toLowerCase()}.`,
		tags: ["synthetic"],
		flags: { synthesizedMemorySold: true },
	};

	state.marketOffers.unshift(id);
	state.marketOffers = state.marketOffers.slice(0, 6);
	state.synthesisHistory.push({ source: [memAId, memBId], result: id });
	metaState.totalSynthesized += 1;
	pushArchive("Synthesis", state.dynamicMemories[id].label);
	saveGame();
	renderScene();
}

function getMemoryById(memoryId) {
	return memoryCatalog[memoryId] || state.dynamicMemories[memoryId] || null;
}

function pushArchive(type, label) {
	metaState.archive.push({ type, label, timestamp: Date.now() });
	if (metaState.archive.length > 60) {
		metaState.archive = metaState.archive.slice(-60);
	}
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildScenarioPool() {
	const pool = [];
	let id = 1;

	for (let subjectIndex = 0; subjectIndex < scenarioSubjects.length; subjectIndex += 1) {
		for (let pressureIndex = 0; pressureIndex < scenarioPressures.length; pressureIndex += 1) {
			const subject = scenarioSubjects[subjectIndex];
			const pressure = scenarioPressures[pressureIndex];
			const dilemma = scenarioDilemmas[(subjectIndex + pressureIndex) % scenarioDilemmas.length];
			const relationshipKey = ["alex", "mara", "jonah"][(subjectIndex + pressureIndex) % 3];

			pool.push({
				id: `scenario_${id}`,
				title: `At ${subject}, ${pressure}`,
				text: `A familiar pattern returns: ${pressure}, and you must ${dilemma} while standing at ${subject}.`,
				fast: {
					money: 45 + ((subjectIndex + pressureIndex) % 35),
					identity: -3,
					coherence: -2,
					relationships: { [relationshipKey]: -2 },
				},
				slow: {
					money: 18 + ((subjectIndex + pressureIndex) % 16),
					identity: 1,
					coherence: 1,
					relationships: { [relationshipKey]: 1 },
				},
				social: {
					money: 24 + ((subjectIndex + pressureIndex) % 22),
					identity: 0,
					coherence: 2,
					relationships: { alex: 1, mara: 1, jonah: 1 },
				},
			});
			id += 1;
		}
	}

	return pool;
}

function getCurrentScenario(currentState) {
	if (!scenarioPool.length) {
		return {
			title: "Fallback Scenario",
			text: "The system failed to load scenarios, so the city repeats itself from memory.",
			fast: { money: 40, identity: -2, coherence: -2, relationships: { alex: -1 } },
			slow: { money: 15, identity: 1, coherence: 1, relationships: { mara: 1 } },
			social: { money: 20, identity: 0, coherence: 2, relationships: { jonah: 1 } },
		};
	}

	const index = currentState.scenarioCursor % scenarioPool.length;
	return scenarioPool[index];
}

const audioManager = {
	context: null,
	gain: null,
	oscillator: null,
	enabled: false,

	init() {
		if (this.context) {
			return;
		}
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) {
			return;
		}
		this.context = new AudioCtx();
		this.gain = this.context.createGain();
		this.gain.gain.value = 0.02;
		this.oscillator = this.context.createOscillator();
		this.oscillator.type = "triangle";
		this.oscillator.frequency.value = 145;
		this.oscillator.connect(this.gain);
		this.gain.connect(this.context.destination);
		this.oscillator.start();
	},

	toggle() {
		if (!this.context) {
			this.init();
		}
		if (!this.context) {
			return;
		}
		this.enabled = !this.enabled;
		metaState.audioEnabled = this.enabled;
		if (this.enabled && this.context.state === "suspended") {
			this.context.resume();
		}
		this.gain.gain.value = this.enabled ? 0.02 : 0;
		elements.audioToggleButton.textContent = this.enabled ? "Mute Audio" : "Enable Audio";
		saveMeta();
	},

	updateForState(currentState) {
		if (!this.enabled || !this.oscillator) {
			return;
		}
		const freq = 120 + (currentState.identity * 0.5) + (currentState.coherence * 0.2);
		this.oscillator.frequency.setTargetAtTime(freq, this.context.currentTime, 0.2);
	},

	pulseOnSale(category) {
		if (!this.enabled || !this.gain || !this.context) {
			return;
		}
		const bump = category === "Core" ? 0.045 : 0.03;
		this.gain.gain.cancelScheduledValues(this.context.currentTime);
		this.gain.gain.setValueAtTime(this.gain.gain.value, this.context.currentTime);
		this.gain.gain.linearRampToValueAtTime(bump, this.context.currentTime + 0.05);
		this.gain.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 0.22);
	},
};

function updateStatus() {
	elements.moneyValue.textContent = String(state.money);
	elements.identityValue.textContent = String(state.identity);
	elements.coherenceValue.textContent = String(state.coherence);
	updateRelationshipMeter("alex", elements.alexValue, elements.alexMeter);
	updateRelationshipMeter("mara", elements.maraValue, elements.maraMeter);
	updateRelationshipMeter("jonah", elements.jonahValue, elements.jonahMeter);
}

function updateRelationshipMeter(key, valueElement, meterElement) {
	valueElement.textContent = String(state.relationships[key]);
	meterElement.style.width = `${state.relationships[key]}%`;
}

function applyAtmosphere() {
	document.body.classList.toggle("identity-low", state.identity <= 50);
	document.body.classList.toggle("identity-critical", state.identity <= 25);
}

function triggerGlitch(category) {
	const intensity = category === "Core" ? 900 : category === "Identity" ? 700 : 450;
	elements.sceneCard.classList.remove("glitching");
	void elements.sceneCard.offsetWidth;
	elements.sceneCard.classList.add("glitching");
	window.setTimeout(() => {
		elements.sceneCard.classList.remove("glitching");
	}, intensity);
}

function determineEnding() {
	const relationshipTotal = getRelationshipTotal(state);

	if (state.flags.refusedFinalSale && relationshipTotal >= 165 && state.identity >= 55 && state.coherence >= 55) {
		return "second_chance";
	}

	if (state.identity < 18 || state.coherence < 20 || (state.flags.soldCoreMemory && relationshipTotal < 90 && state.money >= state.debt)) {
		return "amnesias_gift";
	}

	if (state.money >= state.debt && relationshipTotal < 105) {
		return "hollow_victory";
	}

	if (state.identity >= 45 && state.coherence >= 45 && relationshipTotal >= 135) {
		return "redemption";
	}

	return "fractured";
}

function renderEnding() {
	const endingId = state.ending || determineEnding();
	const ending = endingCatalog[endingId];
	const coda = getEndingCoda(state);
	const endingLines = coda ? [...ending.text, coda] : ending.text;
	state.ending = endingId;
	elements.endingLabel.textContent = ending.label;
	elements.endingTitle.textContent = ending.title;
	elements.endingText.innerHTML = endingLines.map((line) => `<p>${line}</p>`).join("");
	elements.endingSummary.innerHTML = [
		summaryCard("Credits", state.money),
		summaryCard("Identity", state.identity),
		summaryCard("Coherence", state.coherence),
		summaryCard("Connections", getRelationshipTotal(state)),
		summaryCard("Memories Sold", state.soldMemories.length),
	].join("");
	registerRunMeta(endingId);
	saveGame();
}

function summaryCard(label, value) {
	return `<div class="summary-card"><span class="label">${label}</span><strong>${value}</strong></div>`;
}

function registerRunMeta(endingId) {
	metaState.runsCompleted += 1;
	if (!metaState.endingsUnlocked.includes(endingId)) {
		metaState.endingsUnlocked.push(endingId);
	}
	pushArchive("Ending", endingCatalog[endingId].title);
	updateMetaSummary();
}

function updateMetaSummary() {
	if (!elements.metaSummary) {
		return;
	}
	elements.metaSummary.textContent = `Runs: ${metaState.runsCompleted} | Endings unlocked: ${metaState.endingsUnlocked.length} | Sold total: ${metaState.totalMemoriesSold} | Synthesized: ${metaState.totalSynthesized}`;
}

function getRelationshipTotal(currentState) {
	return Object.values(currentState.relationships).reduce((sum, value) => sum + value, 0);
}

function getStrongestRelationshipKey(currentState) {
	const entries = Object.entries(currentState.relationships).sort((first, second) => second[1] - first[1]);
	return entries[0][0];
}

function getMostAffectedPerson(currentState) {
	const entries = Object.entries(currentState.relationships);
	const sorted = entries.sort((first, second) => first[1] - second[1]);
	const [key] = sorted[0];
	return {
		key,
		...confrontationProfiles[key],
	};
}

function getEndingWitness(currentState) {
	const scores = currentState.relationships;
	const entries = Object.entries(scores).sort((first, second) => second[1] - first[1]);
	return witnessProfiles[entries[0][0]];
}

function getLastSoldMemory(currentState) {
	const memoryId = currentState.soldMemories[currentState.soldMemories.length - 1];
	return memoryCatalog[memoryId] || currentState.dynamicMemories[memoryId] || null;
}

function getChoiceHint() {
	if (state.currentScene === "scenario_loop") {
		const remaining = Math.max(0, state.scenarioTarget - state.scenariosCompleted);
		return `Scenario marathon active. ${remaining} remaining before ending unlock.`;
	}
	if (state.currentScene === "memory_drift") {
		return "You can stay here a while. Reflection is part of the game, not wasted time.";
	}
	if (state.currentScene === "late_platform") {
		return "The platform offers distance, not innocence.";
	}
	if (state.identity <= 25) {
		return "The room flickers. The easiest choice may no longer be the truest one.";
	}
	if (state.coherence <= 40) {
		return "Names blur at the edges. Slow down before you trade another anchor.";
	}
	if (state.soldMemories.length >= 4) {
		return "People remember you partly through what you still remember back.";
	}
	return "Every decision leaves a shape behind.";
}

function getEndingCoda(currentState) {
	if (currentState.flags.askedToBeRemembered) {
		return "For the first time in a long while, you let another person keep watch without turning that need into a shameful secret.";
	}
	if (currentState.flags.signedIndenture) {
		return "The contract still waits in your pocket, a reminder that not every compromise bleeds immediately. Some of them bill you in years.";
	}
	if (currentState.flags.refusedFinalSale) {
		return "The debt remains, but so does the stubborn knowledge that the most meaningful parts of a life cannot be defended by price alone.";
	}
	if (currentState.flags.soldCoreMemory) {
		return "Some coordinates are still gone from the map of you. The ending does not pretend otherwise.";
	}
	return "What remains is not untouched. It is simply still yours to live with, which is another kind of grace.";
}

function isHidden(choice) {
	if (!choice.hidden) {
		return false;
	}
	return Boolean(choice.hidden(state));
}

function isChoiceAvailable(choice) {
	if (!choice.condition) {
		return true;
	}
	return Boolean(choice.condition(state));
}

function clamp(value, min, max) {
	return Math.min(max, Math.max(min, value));
}

elements.newGameButton.addEventListener("click", startNewGame);
elements.continueButton.addEventListener("click", continueGame);
elements.clearSaveButton.addEventListener("click", () => {
	clearSave();
	showScreen("title");
	updateMetaSummary();
});
elements.saveButton.addEventListener("click", saveGame);
elements.synthesizeButton.addEventListener("click", synthesizeLastTwo);
elements.audioToggleButton.addEventListener("click", () => {
	audioManager.toggle();
});
elements.restartButton.addEventListener("click", () => {
	clearSave();
	startNewGame();
});
elements.returnButton.addEventListener("click", () => {
	showScreen("title");
	updateContinueButton();
	updateMetaSummary();
});

if (metaState.audioEnabled) {
	audioManager.enabled = true;
	elements.audioToggleButton.textContent = "Mute Audio";
}

updateContinueButton();
updateMetaSummary();
showScreen("title");