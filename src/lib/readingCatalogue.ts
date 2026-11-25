import { READING_LESSONS } from "@/data/reading-lessons";
import { applyCatalogue, type ContentCatalogue } from "./learningContent";

/** Kept apart from learningContent so pages that only list Listening do not bundle every reading passage. */
export const publishedReading = (catalogue: ContentCatalogue | null) => applyCatalogue(READING_LESSONS, catalogue?.states ?? {}, catalogue?.reading ?? []);
