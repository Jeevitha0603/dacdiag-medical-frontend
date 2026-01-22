type Props = {
  title: string;
  value: string;
  highlight?: boolean;
};

export default function StatCard({ title, value, highlight }: Props) {
  return (
    <div
      className={`rounded-xl p-6 ${
        highlight ? "bg-primary text-white" : "bg-white"
      }`}
    >
      <p className="text-sm">{title}</p>
      <h3 className="text-3xl font-bold my-2">{value}</h3>
      <p className="text-sm opacity-70">This month</p>
    </div>
  );
}
