export type InquiryInput = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

type Errors<T> = Partial<Record<keyof T, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^(\+?63|0)\d{9,11}$/;

export function validateInquiry(input: InquiryInput): Errors<InquiryInput> {
  const errors: Errors<InquiryInput> = {};

  if (input.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Enter a valid email.";
  if (!PHONE.test(input.phone.replace(/[^\d+]/g, ""))) {
    errors.phone = "Enter a valid PH phone number.";
  }
  if (!input.interest.trim()) {
    errors.interest = "Choose what you are interested in.";
  }
  if (input.message.trim().length < 10) {
    errors.message = "Tell us a little more (at least 10 characters).";
  }

  return errors;
}
