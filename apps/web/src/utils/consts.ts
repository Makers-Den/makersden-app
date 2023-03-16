/**
 * The default set of story relations that should be resolved when fetching a story.
 * Each element is in the format of [block name].[field name]
 *
 * You have to explicitly use this when relevant.
 * If a relation isn't resolved, it'll just be an array of uuids.
 * If a relation is resolved, it'll be an array of stories with content populated.
 */
export const STORYBLOK_RESOLVED_RELATIONS = "SOWEstimationSection.estimation";
