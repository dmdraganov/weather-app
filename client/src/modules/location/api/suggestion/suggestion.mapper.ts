import type { LocationSuggestion } from '../../models/location-suggestion.model';
import type { SuggestionDto } from './suggestion.dto';

export const mapSuggestion = (dto: SuggestionDto): LocationSuggestion => {
  return {
    id: dto.uri,
    title: dto.title.text,
    subtitle: dto.subtitle.text,
    tags: dto.tags,
  };
};
