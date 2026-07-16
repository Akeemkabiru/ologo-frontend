"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormInput,
  FormSelect,
  FormFileUpload,
  FormButton,
} from "@/components/forms/FormComponents";
import {
  INDIVIDUAL_ID_TYPES,
  ORGANISATION_ID_TYPES,
  ORGANISATION_TYPES,
  ORGANISATION_SUFFIXES,
} from "@/lib/constants";

interface PersonIdentity {
  idType: string;
  idNumber: string;
  fullName: string;
  idDocument: File | null;
}

interface OrgIdentity {
  organisationType: string;
  organisationName: string;
  organisationSuffix: string;
  idType: string;
  idNumber: string;
  idDocument: File | null;
}

const emptyPerson: PersonIdentity = {
  idType: "",
  idNumber: "",
  fullName: "",
  idDocument: null,
};

const emptyOrg: OrgIdentity = {
  organisationType: "",
  organisationName: "",
  organisationSuffix: "",
  idType: "",
  idNumber: "",
  idDocument: null,
};

interface IdentityFormProps {
  entityStorageKey: string;
  storageKey: string;
  nextHref: string;
  backHref: string;
  defaultName?: string;
}

export default function IdentityForm({
  entityStorageKey,
  storageKey,
  nextHref,
  backHref,
  defaultName = "",
}: IdentityFormProps) {
  const router = useRouter();
  const [entityType, setEntityType] = useState<string>("individual");
  const [person, setPerson] = useState<PersonIdentity>({
    ...emptyPerson,
    fullName: defaultName,
  });
  const [org, setOrg] = useState<OrgIdentity>(emptyOrg);
  const [contact, setContact] = useState<PersonIdentity>(emptyPerson);

  useEffect(() => {
    const savedEntity = sessionStorage.getItem(entityStorageKey);
    if (savedEntity) setEntityType(savedEntity);
  }, [entityStorageKey]);

  const isIndividual = entityType === "individual";

  const isComplete = isIndividual
    ? !!(person.idType && person.idNumber && person.fullName && person.idDocument)
    : !!(
        org.organisationType &&
        org.organisationName &&
        org.idType &&
        org.idNumber &&
        org.idDocument &&
        contact.idType &&
        contact.idNumber &&
        contact.fullName &&
        contact.idDocument
      );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;

    const payload = isIndividual
      ? { entityType, person: { ...person, idDocument: person.idDocument?.name } }
      : {
          entityType,
          organisation: { ...org, idDocument: org.idDocument?.name },
          contact: { ...contact, idDocument: contact.idDocument?.name },
        };

    sessionStorage.setItem(storageKey, JSON.stringify(payload));
    router.push(nextHref);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 mb-2">
        Identity Verification
      </h1>
      <p className="text-gray-600 text-sm mb-8 leading-relaxed">
        {isIndividual
          ? "Provide your government-issued ID details"
          : "Provide your organisation's registration details and a contact person's ID"}
      </p>

      <Form onSubmit={handleSubmit}>
        {isIndividual ? (
          <PersonIdentityFields
            values={person}
            onChange={setPerson}
            idTypeOptions={INDIVIDUAL_ID_TYPES}
          />
        ) : (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Organisation Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="Organisation Type"
                    required
                    options={ORGANISATION_TYPES}
                    value={org.organisationType}
                    onChange={(e) =>
                      setOrg((p) => ({ ...p, organisationType: e.target.value }))
                    }
                  />
                  <FormSelect
                    label="Suffix (optional)"
                    options={ORGANISATION_SUFFIXES}
                    value={org.organisationSuffix}
                    onChange={(e) =>
                      setOrg((p) => ({
                        ...p,
                        organisationSuffix: e.target.value,
                      }))
                    }
                  />
                </div>
                <FormInput
                  label="Organisation Name"
                  required
                  placeholder="e.g., Acme Foundation"
                  value={org.organisationName}
                  onChange={(e) =>
                    setOrg((p) => ({ ...p, organisationName: e.target.value }))
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="ID Type"
                    required
                    options={ORGANISATION_ID_TYPES}
                    value={org.idType}
                    onChange={(e) =>
                      setOrg((p) => ({ ...p, idType: e.target.value }))
                    }
                  />
                  <FormInput
                    label="ID Number"
                    required
                    placeholder="Certificate / RC number"
                    value={org.idNumber}
                    onChange={(e) =>
                      setOrg((p) => ({ ...p, idNumber: e.target.value }))
                    }
                  />
                </div>
                <FormFileUpload
                  label="Upload Document"
                  required
                  helperText={
                    org.idDocument
                      ? org.idDocument.name
                      : "PDF, PNG, JPG up to 10MB"
                  }
                  onFileChange={(file) =>
                    setOrg((p) => ({ ...p, idDocument: file }))
                  }
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Contact Person&apos;s Identity
              </h2>
              <PersonIdentityFields
                values={contact}
                onChange={setContact}
                idTypeOptions={INDIVIDUAL_ID_TYPES}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8 sm:mt-10 md:mt-12">
          <FormButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => router.push(backHref)}
            className="flex-1"
          >
            Back
          </FormButton>
          <FormButton
            type="submit"
            size="lg"
            disabled={!isComplete}
            className="flex-1"
          >
            Continue
          </FormButton>
        </div>
      </Form>
    </div>
  );
}

function PersonIdentityFields({
  values,
  onChange,
  idTypeOptions,
}: {
  values: PersonIdentity;
  onChange: (updater: (prev: PersonIdentity) => PersonIdentity) => void;
  idTypeOptions: { label: string; value: string }[];
}) {
  return (
    <div className="space-y-4">
      <FormInput
        label="Full Legal Name"
        required
        placeholder="As it appears on your ID"
        value={values.fullName}
        onChange={(e) => onChange((p) => ({ ...p, fullName: e.target.value }))}
        helperText="Confirm or edit the name you signed up with"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="ID Type"
          required
          options={idTypeOptions}
          value={values.idType}
          onChange={(e) => onChange((p) => ({ ...p, idType: e.target.value }))}
        />
        <FormInput
          label="ID Number"
          required
          placeholder="ID number"
          value={values.idNumber}
          onChange={(e) =>
            onChange((p) => ({ ...p, idNumber: e.target.value }))
          }
        />
      </div>
      <FormFileUpload
        label="Upload ID"
        required
        helperText={
          values.idDocument ? values.idDocument.name : "PDF, PNG, JPG up to 10MB"
        }
        onFileChange={(file) => onChange((p) => ({ ...p, idDocument: file }))}
      />
    </div>
  );
}
