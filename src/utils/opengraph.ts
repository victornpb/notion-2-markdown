import ogs from 'open-graph-scraper';

export default async function (url:string) {
    return ogs({ url });
}