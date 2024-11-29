import Appbar from "/layout/Appbar";

export default function ProductLayout({ children }) {
  return (
    <section>
      <Appbar>{children}</Appbar>
    </section>
  );
}
