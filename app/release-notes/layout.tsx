export default function ArchiveLayout({archive}:{archive: any}, latest: any){
    return(
        <div>
            <h1>Release Notes Archive</h1>
            <section id="archive-filter">
                {archive}
            </section>
            <section id="archive-latest">
                {latest}
            </section>
        </div>
    );
}