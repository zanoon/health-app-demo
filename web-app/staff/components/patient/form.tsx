import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import * as yup from "yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoading } from "../../state/loading";
import { usePlacesWidget } from "react-google-autocomplete";
import _ from "lodash";
import { LegacyRef } from "react";

const PatientYupSchema = yup.object({
  id: yup.number(),
  address_line_1: yup.string().required(),
  address_line_2: yup.string().default(""),
  city: yup.string().required(),
  state: yup.string().required(),
  zip_code: yup.string().required(),
  country: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  full_name: yup.string(),
  email: yup.string().required(),
  phone: yup.string().required(),
  date_of_birth: yup.string().required(),
  gender: yup.string().required(),
  health_care_number: yup.string(),
});
export type PatientFormType = yup.InferType<typeof PatientYupSchema>;

export interface PersonalInfoCardProps {
  onSubmit(): void;
}

export const PersonalInfoCard = ({ onSubmit }: PersonalInfoCardProps) => {
  const { formState, register, setValue } = useFormContext<PatientFormType>();
  const { loading } = useLoading();

  const { ref } = usePlacesWidget<any>({
    apiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    onPlaceSelected: (place: any) => {
      if (!place) return;
      const mappedLoc: any = _.chain(place.address_components)
        .map((component) => {
          const type = component.types[0];
          const value = component.long_name;
          return { [type]: value };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        })
        .value();

      setValue(
        "address_line_1",
        mappedLoc.street_number + " " + mappedLoc.route,
      );
      setValue("address_line_2", mappedLoc.subpremise);
      setValue("city", mappedLoc.administrative_area_level_2);
      setValue("state", mappedLoc.administrative_area_level_1);
      setValue("zip_code", mappedLoc.postal_code);
      setValue("country", mappedLoc.country);

      if (ref.current) {
        ref.current.value = place.name;
      }
    },
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "uk" },
      fields: ["address_components", "name"],
    },
  });

  return (
    <Skeleton isLoaded={!loading} w={"100%"}>
      <Box
        as="form"
        bg="bg-surface"
        boxShadow="sm"
        borderRadius="lg"
        maxW={{ lg: "3xl" }}
      >
        <Stack
          spacing="5"
          px={{ base: "4", md: "6" }}
          py={{ base: "5", md: "6" }}
        >
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="firstName"
              isInvalid={formState.errors.first_name !== undefined}
            >
              <FormLabel>Forename</FormLabel>
              <Input {...register("first_name")} autoComplete="off" />
            </FormControl>
            <FormControl
              id="lastName"
              isInvalid={formState.errors.last_name !== undefined}
            >
              <FormLabel>Surname</FormLabel>
              <Input {...register("last_name")} autoComplete="off" />
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="email"
              isInvalid={formState.errors.email !== undefined}
            >
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} autoComplete="off" />
            </FormControl>
            <FormControl
              id="phone"
              isInvalid={formState.errors.phone !== undefined}
            >
              <FormLabel>Phone Number</FormLabel>
              <Input {...register("phone")} autoComplete="off" />
            </FormControl>
          </Stack>

          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="add1"
              isInvalid={formState.errors.address_line_1 !== undefined}
            >
              <FormLabel>Address Line 1</FormLabel>
              <Input
                ref={ref as unknown as LegacyRef<HTMLInputElement>}
                autoComplete="off"
                onChange={(e) => {
                  setValue("address_line_1", e.target.value);
                }}
              />
            </FormControl>
            <FormControl
              id="add2"
              isInvalid={formState.errors.address_line_2 !== undefined}
            >
              <FormLabel>Address Line 2</FormLabel>
              <Input {...register("address_line_2")} autoComplete="off" />
            </FormControl>
          </Stack>

          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="city"
              isInvalid={formState.errors.city !== undefined}
            >
              <FormLabel>City</FormLabel>
              <Input {...register("city")} autoComplete="off" />
            </FormControl>
            <FormControl
              id="state"
              isInvalid={formState.errors.state !== undefined}
            >
              <FormLabel>Province / County</FormLabel>
              <Input {...register("state")} autoComplete="off" />
            </FormControl>
            <FormControl
              id="zip"
              isInvalid={formState.errors.zip_code !== undefined}
            >
              <FormLabel>Post Code</FormLabel>
              <Input {...register("zip_code")} autoComplete="off" />
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="country"
              isInvalid={formState.errors.country !== undefined}
            >
              <FormLabel>Country</FormLabel>
              <Input {...register("country")} autoComplete="off" />
            </FormControl>
            <FormControl
              id="dob"
              isInvalid={formState.errors.date_of_birth !== undefined}
            >
              <FormLabel>Date of Birth (DD/MM/YY)</FormLabel>
              <Input {...register("date_of_birth")} autoComplete="off" />
            </FormControl>
          </Stack>
          <Stack spacing="6" direction={{ base: "column", md: "row" }}>
            <FormControl
              id="gender"
              isInvalid={formState.errors.gender !== undefined}
            >
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Gender" {...register("gender")}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl
              id="careNum"
              isInvalid={formState.errors.health_care_number !== undefined}
            >
              <FormLabel>NHS Number (Optional)</FormLabel>
              <Input {...register("health_care_number")} autoComplete="off" />
            </FormControl>
          </Stack>
        </Stack>
        <Divider />
        <Flex direction="row-reverse" py="4" px={{ base: "4", md: "6" }}>
          <Button
            variant="primary"
            onClick={() => {
              onSubmit();
            }}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Skeleton>
  );
};

export interface PersonInfoFormProps {
  onSubmit: (data: PatientFormType) => void;
  defaultValues?: PatientFormType;
}

export const PersonInfoForm = ({
  onSubmit,
  defaultValues,
}: PersonInfoFormProps) => {
  const dv: any = defaultValues;
  const methods = useForm({
    resolver: yupResolver(PatientYupSchema),
    defaultValues: dv,
  });
  return (
    <Flex>
      <FormProvider {...methods}>
        <PersonalInfoCard
          onSubmit={methods.handleSubmit(
            (data) => {
              onSubmit(data as PatientFormType);
            },
            (err) => {
              console.log(err);
            },
          )}
        />
      </FormProvider>
    </Flex>
  );
};
