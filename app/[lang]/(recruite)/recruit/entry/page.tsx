import EntryForm from "@/modules/recruite/entry/EntryForm";
import Header from "@/modules/recruite/Header";

export default function page() {
  return (
    <>
      <Header isWhite={false} />
      <EntryForm />
    </>
  );
}
