import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFilterStore } from "@/store/module";

const useFilterWithUrlParams = () => {
  const location = useLocation();
  const filterStore = useFilterStore();
  const { tag, text, memoPropertyFilter } = filterStore.state;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tag = urlParams.getAll("tag");
    const text = urlParams.get("text");
    if (tag.length > 0) {
      filterStore.setTagFilter(tag);
    }
    if (text) {
      filterStore.setTextFilter(text);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (tag && tag.length > 0) {
      const tagString = tag.join(',');
      urlParams.set("tag", tagString);
    } else {
      urlParams.delete("tag");
    }
    if (text) {
      urlParams.set("text", text);
    } else {
      urlParams.delete("text");
    }
    const params = urlParams.toString();
    window.history.replaceState({}, "", `${location.pathname}${params?.length > 0 ? `?${params}` : ""}`);
  }, [tag, text]);

  return {
    tag,
    text,
    memoPropertyFilter,
  };
};

export default useFilterWithUrlParams;
