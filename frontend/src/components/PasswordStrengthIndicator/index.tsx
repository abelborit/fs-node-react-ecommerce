export const PasswordStrengthIndicator = ({
  password,
}: {
  password: string;
}) => {
  const rules = [
    { regex: /.{8,}/, message: "At least 8 characters" },
    { regex: /[a-z]/, message: "At least one lowercase letter" },
    { regex: /[A-Z]/, message: "At least one uppercase letter" },
    { regex: /\d/, message: "At least one number" },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      message: "At least one special character",
    },
  ];

  return (
    <ul className="text-xs mt-4 space-y-1">
      {rules.map((rule, index) => (
        <li
          key={index}
          className={`flex items-center ${
            rule.regex.test(password) ? "text-green-500" : "text-gray-500"
          }`}
        >
          <span className="mr-1">{rule.regex.test(password) ? "✔" : "✘"}</span>
          {rule.message}
        </li>
      ))}
    </ul>
  );
};
