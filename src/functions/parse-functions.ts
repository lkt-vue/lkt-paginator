import { LktObject } from 'lkt-vue-kernel';

export const parseFilters = (filters: LktObject) => {
  let r: LktObject = {};
  if (typeof filters === 'object' && Object.keys(filters).length > 0) {
    r = JSON.parse(JSON.stringify(filters));
  }
  for (let k in r) {
    if (Array.isArray(r[k]) || typeof r[k] === 'object') {
      r[k] = JSON.stringify(r[k]);
    }
  }
  return r;
};

export const parseNumericPageFilters = (filters: LktObject, page: number) => {
  let r = parseFilters(filters);
  r.page = page;
  return r;
}

export const parseTimelinePageFilters = (filters: LktObject, visibleDate: Date|undefined, oldestDate: Date|undefined, newestDate: Date|undefined) => {
  let r = parseFilters(filters);
  r.visibleDate = visibleDate;
  r.oldestDate = oldestDate;
  r.newestDate = newestDate;
  return r;
}