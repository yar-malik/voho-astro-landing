declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"5-Key-Benefits-of-AI-Receptionist-Prompting-Technology.md": {
	id: "5-Key-Benefits-of-AI-Receptionist-Prompting-Technology.md";
  slug: "5-Key-Benefits-of-AI-Receptionist-Prompting-Technology";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"A-Complete-Guide-to-AI-Phone-Agents-in-2024.md": {
	id: "A-Complete-Guide-to-AI-Phone-Agents-in-2024.md";
  slug: "A-Complete-Guide-to-AI-Phone-Agents-in-2024";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"A-Dive-into-AI-Receptionists-Your-Help-at-the-Front-Desk.md": {
	id: "A-Dive-into-AI-Receptionists-Your-Help-at-the-Front-Desk.md";
  slug: "A-Dive-into-AI-Receptionists-Your-Help-at-the-Front-Desk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI Answering Services for Small Businesses Leveling the Playing Field.md": {
	id: "AI Answering Services for Small Businesses Leveling the Playing Field.md";
  slug: "AI-Answering-Services-for-Small-Businesses-Leveling-the-Playing-Field";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Answering-Services-for-E-commerce-Providing-24-7-Customer-Support.md": {
	id: "AI-Answering-Services-for-E-commerce-Providing-24-7-Customer-Support.md";
  slug: "AI-Answering-Services-for-E-commerce-Providing-24-7-Customer-Support";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Answering-Services-for-E-commerce-Providing-24.md": {
	id: "AI-Answering-Services-for-E-commerce-Providing-24.md";
  slug: "AI-Answering-Services-for-E-commerce-Providing-24";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Driven Personalization Enhancing Customer Experience Through Intelligent Answering Services.md": {
	id: "AI-Driven Personalization Enhancing Customer Experience Through Intelligent Answering Services.md";
  slug: "AI-Driven-Personalization-Enhancing-Customer-Experience-Through-Intelligent-Answering-Services";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Outbound-Calls-and-the-Future-of-Work.md": {
	id: "AI-Outbound-Calls-and-the-Future-of-Work.md";
  slug: "AI-Outbound-Calls-and-the-Future-of-Work";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Outbound-Calls-for-Appointment-Scheduling.md": {
	id: "AI-Outbound-Calls-for-Appointment-Scheduling.md";
  slug: "AI-Outbound-Calls-for-Appointment-Scheduling";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Outbound-Calls-in-Customer-Service-Proactive-Outreach-and-Support.md": {
	id: "AI-Outbound-Calls-in-Customer-Service-Proactive-Outreach-and-Support.md";
  slug: "AI-Outbound-Calls-in-Customer-Service-Proactive-Outreach-and-Support";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Outbound-Calls-in-Real-Estate-Generating-Leads-and-Closing-Deals.md": {
	id: "AI-Outbound-Calls-in-Real-Estate-Generating-Leads-and-Closing-Deals.md";
  slug: "AI-Outbound-Calls-in-Real-Estate-Generating-Leads-and-Closing-Deals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Receptionist-Prompting-How-PixEla-Revolutionizes-Customer-Interaction.md": {
	id: "AI-Receptionist-Prompting-How-PixEla-Revolutionizes-Customer-Interaction.md";
  slug: "AI-Receptionist-Prompting-How-PixEla-Revolutionizes-Customer-Interaction";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Voice-Agent – A-Complete-Guide.md": {
	id: "AI-Voice-Agent – A-Complete-Guide.md";
  slug: "AI-Voice-Agent-A-Complete-Guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Voice-Chatbot-for-Product-Demos-and-Trials.md": {
	id: "AI-Voice-Chatbot-for-Product-Demos-and-Trials.md";
  slug: "AI-Voice-Chatbot-for-Product-Demos-and-Trials";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"AI-Voice-Receptionist-Prompts-to-Gain-Better-Customer-Service.md": {
	id: "AI-Voice-Receptionist-Prompts-to-Gain-Better-Customer-Service.md";
  slug: "AI-Voice-Receptionist-Prompts-to-Gain-Better-Customer-Service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Benefits-of-Voice-AI-for-Business.md": {
	id: "Benefits-of-Voice-AI-for-Business.md";
  slug: "Benefits-of-Voice-AI-for-Business";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Boosting-Lead-Generation-with-AI-Answering-Services.md": {
	id: "Boosting-Lead-Generation-with-AI-Answering-Services.md";
  slug: "Boosting-Lead-Generation-with-AI-Answering-Services";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Building-a-Better-Call-Center-with-AI-Voice-A-Step-by-Step-Guide.md": {
	id: "Building-a-Better-Call-Center-with-AI-Voice-A-Step-by-Step-Guide.md";
  slug: "Building-a-Better-Call-Center-with-AI-Voice-A-Step-by-Step-Guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Can-AI-Answer-Phone-Calls-for-Me.md": {
	id: "Can-AI-Answer-Phone-Calls-for-Me.md";
  slug: "Can-AI-Answer-Phone-Calls-for-Me";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Can-Human-Receptionists-Be-Replaced-by-AI-Receptionists.md": {
	id: "Can-Human-Receptionists-Be-Replaced-by-AI-Receptionists.md";
  slug: "Can-Human-Receptionists-Be-Replaced-by-AI-Receptionists";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Cost-Benefit-Analysis-of-AI-Phone-Agents.md": {
	id: "Cost-Benefit-Analysis-of-AI-Phone-Agents.md";
  slug: "Cost-Benefit-Analysis-of-AI-Phone-Agents";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Data-Driven Insights Leveraging AI Analytics to Improve Customer Service Strategies.md": {
	id: "Data-Driven Insights Leveraging AI Analytics to Improve Customer Service Strategies.md";
  slug: "Data-Driven-Insights-Leveraging-AI-Analytics-to-Improve-Customer-Service-Strategies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"From Lead Generation to Customer Retention The Role of AI in the Sales Funnel.md": {
	id: "From Lead Generation to Customer Retention The Role of AI in the Sales Funnel.md";
  slug: "From-Lead-Generation-to-Customer-Retention-The-Role-of-AI-in-the-Sales-Funnel";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-AI-Answering-Service-Virtual-Receptionist-Works.md": {
	id: "How-AI-Answering-Service-Virtual-Receptionist-Works.md";
  slug: "How-AI-Answering-Service-Virtual-Receptionist-Works";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-AI-Receptionists-Help-in-the-Healthcare-Industry.md": {
	id: "How-AI-Receptionists-Help-in-the-Healthcare-Industry.md";
  slug: "How-AI-Receptionists-Help-in-the-Healthcare-Industry";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-AI-Voice-Agents-Help-Small-Businesses-Grow.md": {
	id: "How-AI-Voice-Agents-Help-Small-Businesses-Grow.md";
  slug: "How-AI-Voice-Agents-Help-Small-Businesses-Grow";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-AI-Voice-Enhances-the-Restaurant-Customer-Experience.md": {
	id: "How-AI-Voice-Enhances-the-Restaurant-Customer-Experience.md";
  slug: "How-AI-Voice-Enhances-the-Restaurant-Customer-Experience";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-Much-Does-an-AI-Virtual-Receptionist-Cost.md": {
	id: "How-Much-Does-an-AI-Virtual-Receptionist-Cost.md";
  slug: "How-Much-Does-an-AI-Virtual-Receptionist-Cost";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-to-Build-an-AI-Voice-Agent-Call-Center.md": {
	id: "How-to-Build-an-AI-Voice-Agent-Call-Center.md";
  slug: "How-to-Build-an-AI-Voice-Agent-Call-Center";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"How-to-Leverage-AI-for-Better-E-commerce-Sales.md": {
	id: "How-to-Leverage-AI-for-Better-E-commerce-Sales.md";
  slug: "How-to-Leverage-AI-for-Better-E-commerce-Sales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Leveraging-AI-Answering-Services-to-Enhance-Customer-Support-and-Service-Delivery.md": {
	id: "Leveraging-AI-Answering-Services-to-Enhance-Customer-Support-and-Service-Delivery.md";
  slug: "Leveraging-AI-Answering-Services-to-Enhance-Customer-Support-and-Service-Delivery";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Measuring-the-Effectiveness-of-Virtual-Assistant-AI-Answering-Service.md": {
	id: "Measuring-the-Effectiveness-of-Virtual-Assistant-AI-Answering-Service.md";
  slug: "Measuring-the-Effectiveness-of-Virtual-Assistant-AI-Answering-Service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Revolutionizing-Retail-with-AI-Voice-Enhancing-Customer-Service-and-Sales.md": {
	id: "Revolutionizing-Retail-with-AI-Voice-Enhancing-Customer-Service-and-Sales.md";
  slug: "Revolutionizing-Retail-with-AI-Voice-Enhancing-Customer-Service-and-Sales";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The Future of Customer Service_ How AI Receptionists Are Transforming Businesses.md": {
	id: "The Future of Customer Service_ How AI Receptionists Are Transforming Businesses.md";
  slug: "The-Future-of-Customer-Service-How-AI-Receptionists-Are-Transforming-Businesses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The Future of Retail AI-Powered Customer Service in the Age of E-commerce.md": {
	id: "The Future of Retail AI-Powered Customer Service in the Age of E-commerce.md";
  slug: "The-Future-of-Retail-AI-Powered-Customer-Service-in-the-Age-of-E-commerce";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The-Benefits-of-AI-Voice-Agents-in-Car-Dealerships.md": {
	id: "The-Benefits-of-AI-Voice-Agents-in-Car-Dealerships.md";
  slug: "The-Benefits-of-AI-Voice-Agents-in-Car-Dealerships";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The-Power-of-Emotion-AI-in-Call-Centers-Understanding-and-Responding-to-Customer-Sentiment.md": {
	id: "The-Power-of-Emotion-AI-in-Call-Centers-Understanding-and-Responding-to-Customer-Sentiment.md";
  slug: "The-Power-of-Emotion-AI-in-Call-Centers-Understanding-and-Responding-to-Customer-Sentiment";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The-Rise-of-AI-Voice-in-Banking-Customer-Service-Improving-Security-and-Efficiency.md": {
	id: "The-Rise-of-AI-Voice-in-Banking-Customer-Service-Improving-Security-and-Efficiency.md";
  slug: "The-Rise-of-AI-Voice-in-Banking-Customer-Service-Improving-Security-and-Efficiency";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"The-Rise-of-AI-Voiceovers-in-Film-and-Animation.md": {
	id: "The-Rise-of-AI-Voiceovers-in-Film-and-Animation.md";
  slug: "The-Rise-of-AI-Voiceovers-in-Film-and-Animation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"To-AI-Answering-Service-for-2024-Rapid-Response-with-AI.md": {
	id: "To-AI-Answering-Service-for-2024-Rapid-Response-with-AI.md";
  slug: "To-AI-Answering-Service-for-2024-Rapid-Response-with-AI";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Top-5-AI-Answering-Service-Features-Your-Business-Needs.md": {
	id: "Top-5-AI-Answering-Service-Features-Your-Business-Needs.md";
  slug: "Top-5-AI-Answering-Service-Features-Your-Business-Needs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Top-Tips-and-Tricks-for-Building-Your-First-AI-Voice-Agent.md": {
	id: "Top-Tips-and-Tricks-for-Building-Your-First-AI-Voice-Agent.md";
  slug: "Top-Tips-and-Tricks-for-Building-Your-First-AI-Voice-Agent";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Understand-the-impact-of-AI-in-e-commerce-customer-service.md": {
	id: "Understand-the-impact-of-AI-in-e-commerce-customer-service.md";
  slug: "Understand-the-impact-of-AI-in-e-commerce-customer-service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Voice-AI-Agents-vs-Human-Agents.md": {
	id: "Voice-AI-Agents-vs-Human-Agents.md";
  slug: "Voice-AI-Agents-vs-Human-Agents";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Voice-AI-and-Storytelling-Creating-Immersive-Experiences.md": {
	id: "Voice-AI-and-Storytelling-Creating-Immersive-Experiences.md";
  slug: "Voice-AI-and-Storytelling-Creating-Immersive-Experiences";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"What-Is-an-AI-Answering-Service.md": {
	id: "What-Is-an-AI-Answering-Service.md";
  slug: "What-Is-an-AI-Answering-Service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"What-Is-the-Hardest-Question-to-Ask-AI.md": {
	id: "What-Is-the-Hardest-Question-to-Ask-AI.md";
  slug: "What-Is-the-Hardest-Question-to-Ask-AI";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Which-AI-is-Best-for-Answering-Questions.md": {
	id: "Which-AI-is-Best-for-Answering-Questions.md";
  slug: "Which-AI-is-Best-for-Answering-Questions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-ai-phone-agents-change-customer-support-for-all-ecommerce-businesses.md": {
	id: "how-ai-phone-agents-change-customer-support-for-all-ecommerce-businesses.md";
  slug: "how-ai-phone-agents-change-customer-support-for-all-ecommerce-businesses";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-improve-and-optimize-voice-ai-performance.md": {
	id: "how-to-improve-and-optimize-voice-ai-performance.md";
  slug: "how-to-improve-and-optimize-voice-ai-performance";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"how-to-make-millions-with-your-ecommerce-store-this-black-friday.md": {
	id: "how-to-make-millions-with-your-ecommerce-store-this-black-friday.md";
  slug: "how-to-make-millions-with-your-ecommerce-store-this-black-friday";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
