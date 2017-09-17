import { createSelector } from 'reselect'
import R from 'ramda'

const getAllSongsAsMap = state => R.propOr({}, 'songs', state)

const getAllSongs = createSelector(
    [getAllSongsAsMap],
    (songs) => R.values(songs)
)

const getAllFavouritesId = state => R.propOr([], 'favourites', state)

const getAllFavourites = createSelector(
    [getAllFavouritesId, getAllSongs],
    (favIds, songs) => R.filter(song => R.contains(song.id, favIds))(songs)
)

export default {
    getAllSongsAsMap,
    getAllSongs,
    getAllFavouritesId,
    getAllFavourites
}