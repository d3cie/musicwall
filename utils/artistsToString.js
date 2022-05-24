export default function artistsToString(artist) {
    let artists;
    let Feat = '';
    for (let i = 0; i < artist.length; i++) {
        const MainArtist = artist[0].artistsName;
        if (i != 0) Feat = ", " + artist[i].artistsName + Feat

        if (artist.length == 1) {
            artists = MainArtist
        }
        else {
            artists = MainArtist + Feat
        }
    }
    return artists
}