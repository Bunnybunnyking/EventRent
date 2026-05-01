import { RENTAL_NEED_OPTIONS } from "./constants";
import type { RentalNeedOption } from "./types";

const NOT_ADDITION: RentalNeedOption = "Not sure yet";

/** Categories a host can explore *in addition to* what they already selected when creating the event. */
export function optionalAdditionDropdownOptions(currentRentalNeeds: RentalNeedOption[]): RentalNeedOption[] {
  return RENTAL_NEED_OPTIONS.filter((opt) => opt !== NOT_ADDITION && !currentRentalNeeds.includes(opt));
}
