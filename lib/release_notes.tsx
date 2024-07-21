import { releaseNoteDao } from "@/lib/db";
import { ReleaseNote } from "./types";
import { promises } from "dns";

export async function getAvailableReleaseNotesYears(): Promise<number[]> {
  try {
    const releaseNotes = await releaseNoteDao.readAll();
    const years = releaseNotes.reduce(
      (years: number[], releaseNote: ReleaseNote) => {
        const year = new Date(releaseNote.timestamp).getFullYear();
        if (!years.includes(year)) {
          years.push(year);
        }
        return years;
      },
      []
    );
    return years.sort((a: number, b: number) => b - a);
  } catch (error) {
    console.error("Failed to fetch release notes years:", error);
    return [];
  }
}

export async function getAvailableReleaseNotesMonths(
  year: number
): Promise<number[]> {
  try {
    const releaseNotes = await releaseNoteDao.readAll();
    const months = releaseNotes.reduce(
      (months: number[], releaseNote: ReleaseNote) => {
        const releaseNoteYear = new Date(releaseNote.timestamp).getFullYear();
        if (releaseNoteYear === year) {
          const month = new Date(releaseNote.timestamp).getMonth() + 1; // Adding 1 to match the month number
          if (!months.includes(month)) {
            months.push(month);
          }
        }
        return months;
      },
      []
    );
    return months.sort((a: number, b: number) => a - b);
  } catch (error) {
    console.error("Failed to fetch release notes months:", error);
    return [];
  }
}

export async function getReleaseNotesForYear(
  year: number
): Promise<ReleaseNote[]> {
  try {
    const releaseNotes = await releaseNoteDao.readAll();
    return releaseNotes.filter(
      (releaseNote: ReleaseNote) => releaseNote.year === year
    );
  } catch (error) {
    console.error("Failed to fetch release notes for year:", error);
    return [];
  }
}

export async function getReleaseNotesForYearAndMonth(
  year: number,
  month: number
): Promise<ReleaseNote[]> {
  try {
    const releaseNotes = await releaseNoteDao.readAll();
    return releaseNotes.filter(
      (releaseNote: ReleaseNote) =>
        releaseNote.year === year && releaseNote.month === month
    );
  } catch (error) {
    console.error("Failed to fetch release notes for year and month:", error);
    return [];
  }
}
