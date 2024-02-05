import { TextField } from "../common/InputField";

function PhoneNumberForm({ isLoading }) {
  return (
    <>
      <TextField label="Admin Username *" name="username" type="text" />
      <TextField label="Phone Number *" name="phone" type="tel" />
      <button
        type="submit"
        className="!mt-8 w-full py-3 bg-custom-blue2 rounded  hover:bg-custom-blue4 text-white font-bold active:scale-95 transition duration-300 disabled:pointer-events-none disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Loading" : "Next Step"}
      </button>
    </>
  );
}

export default PhoneNumberForm;
