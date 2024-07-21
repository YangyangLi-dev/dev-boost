import ReleaseNoteList from "@/components/ReleaseNoteList";
import {
  getAvailableReleaseNotesMonths,
  getAvailableReleaseNotesYears,
  getReleaseNotesForYear,
  getReleaseNotesForYearAndMonth,
} from "@/lib/release_notes";
import Link from "next/link";

export default async function FilteredReleaseNotesPage({
  params,
}: {
  params: { filter: string[] };
}) {
  const filter = params.filter;
  const selectedYear = filter?.[0] ? parseInt(filter[0]) : undefined;
  const selectedMonth = filter?.[1] ? parseInt(filter[1]) : undefined;

  let releaseNotes: any[] = [];
  let links: number[] = [];
  let content = <p>No release notes for the selected period</p>;

  const availableYears = await getAvailableReleaseNotesYears();

  if (selectedYear && !selectedMonth) {
    releaseNotes = await getReleaseNotesForYear(selectedYear);
    links = await getAvailableReleaseNotesMonths(selectedYear);
  } else if (selectedYear && selectedMonth) {
    releaseNotes = await getReleaseNotesForYearAndMonth(
      selectedYear,
      selectedMonth
    );
  } else {
    links = availableYears;
  }

  if (releaseNotes && releaseNotes.length > 0) {
    content = <ReleaseNoteList notes={releaseNotes} />;
  }

  if (
    (selectedYear && !availableYears.includes(selectedYear)) ||
    (selectedMonth &&
      !(await getAvailableReleaseNotesMonths(selectedYear!)).includes(
        selectedMonth
      ))
  ) {
    throw new Error("Invalid filter.");
  }

  return (
    <div>
      <h1>Release Notes</h1>
      <div>
        {links.map((link) => (
          <Link
            key={link}
            href={`/release-notes/${
              selectedYear ? `${selectedYear}/` : ""
            }${link}`}
          >
            {link}
          </Link>
        ))}
      </div>
      {content}
    </div>
  );
}
