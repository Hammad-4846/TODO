import { Dispatch, SetStateAction } from "react";
import { MdSearch } from "react-icons/md";

function Search({
  handleSearchNote,
}: {
  handleSearchNote: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="search">
      <MdSearch className="search-icons" size="1.3em" />
      <input
        onChange={(event) => handleSearchNote(event.target.value)}
        type="text"
        placeholder="type to search..."
      />
    </div>
  );
}

export default Search;
