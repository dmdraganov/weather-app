import type { LocationSuggestion } from '../../model/entities/location-suggestion';
import type { SuggestionDto } from './suggestion.dto';

export const mapSuggestion = (dto: SuggestionDto): LocationSuggestion => {
  return {
    id: dto.uri,
    title: dto.title.text,
    subtitle: dto.subtitle?.text,
    tags: dto.tags,
  };
};
