interface TitleComponentProps {
  firstText: string;
  secondText: string;
}

export const TitleComponent = ({
  firstText,
  secondText,
}: TitleComponentProps) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {firstText}{" "}
        <span className="text-gray-700 font-medium">{secondText}</span>
      </p>

      <div className="w-10 md:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
    </div>
  );
};
