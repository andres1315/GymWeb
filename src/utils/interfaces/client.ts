import type { Country, DocumentType, Gender, HowDidYouHear, PersonType, TaxResponsability } from "./common";

export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    is_leader: boolean;
    is_active: boolean;
    enrollment_date: string;
    document_type_id: number;
    identification: string;
    person_type_id?: number | null;
    tax_responsability_id?: number | null;
    date_of_birth?: string | null;
    place_of_birth?: string | null;
    country_id?: number | null;
    address?: string | null;
    phone?: string | null;
    email: string;
    gender_id?: number | null;
    eps?: string | null;
    profession?: string | null;
    phone_emergency?: string | null;
    contact_emergency?: string | null;
    how_did_you_hear_id?: number | null;
    expiration_date?: string | null;
    observations?: string | null;
    created_at: string;
    updated_at: string;
    personType?: PersonType | null;
    documentType?: DocumentType | null;
    taxResponsability?: TaxResponsability | null;
    gender?: Gender | null;
    country?: Country | null;
    howDidYouHear?: HowDidYouHear | null;
}
