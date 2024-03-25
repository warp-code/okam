export default function TextInput({
  name,
  value,
  label,
  placeholder,
  handleOnChange,
}: {
  name: string;
  value: any;
  label?: string | undefined;
  placeholder?: string | undefined;
  handleOnChange: Function;
}) {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="text-gray-50 text-lg text-left cursor-pointer"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e.target.value)}
        className="block w-full border border-green-700 focus:border-green-400 focus:outline-none rounded-2xl px-6 py-4 bg-okam-dark-green placeholder:text-gray-400 text-gray-50"
      />
    </>
  );
}
