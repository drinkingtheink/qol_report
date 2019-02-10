const austin = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:4671654/"}},"matching_alternate_names":[{"name":"Austin"},{"name":"Austino"},{"name":"Austinopolis"}],"matching_full_name":"Austin, Texas, United States"}

const nyc = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:5128581/"}},"matching_alternate_names":[{"name":"New York"},{"name":"New York borg"},{"name":"New York City"},{"name":"New York kenti"},{"name":"New York Stad"},{"name":"New York-borg"},{"name":"New Yorke"},{"name":"New Yorku"}],"matching_full_name":"New York City, New York, United States"}

const sf = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:5391959/"}},"matching_alternate_names":[{"name":"San Franciscu"},{"name":"San Francisco"},{"name":"San Francisko"}],"matching_full_name":"San Francisco, California, United States"}

const chicago = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:4887398/"}},"matching_alternate_names":[{"name":"Chicago"}],"matching_full_name":"Chicago, Illinois, United States"}

const london = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:2643743/"}},"matching_alternate_names":[{"name":"london"},{"name":"London"},{"name":"London osh"},{"name":"Londona"},{"name":"Londonas"},{"name":"Londoni"},{"name":"londoni"},{"name":"Londono"},{"name":"Londons"},{"name":"Londonu"}],"matching_full_name":"London, England, United Kingdom"}

const tokyo = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:1850147/"}},"matching_alternate_names":[{"name":"Tokyo"},{"name":"tokyo"}],"matching_full_name":"Tokyo, Tokyo, Japan"}

const shanghai = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:1796236/"}},"matching_alternate_names":[{"name":"Shanghai"},{"name":"Shanghai - shang hai"},{"name":"Shanghai - 上海"},{"name":"shanghay"}],"matching_full_name":"Shanghai, Shanghai, China"}

const istanbul = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:745044/"}},"matching_alternate_names":[{"name":"İstanbul"},{"name":"Istanbul"}],"matching_full_name":"Istanbul, Istanbul, Turkey"}

const moscow = {"_links":{"city:item":{"href":"https://api.teleport.org/api/cities/geonameid:524901/"}},"matching_alternate_names":[{"name":"Moscow"}],"matching_full_name":"Moscow, Moscow, Russia"}

const staticLocaleOptions = [
  {
    name: 'Austin',
    data: austin
  },
  {
    name: 'New York City',
    data: nyc
  },
  {
    name: 'San Francisco',
    data: sf
  },
  {
    name: 'Chicago',
    data: chicago
  },
  {
    name: 'London',
    data: london
  },
  {
    name: 'Tokyo',
    data: tokyo
  },
  {
    name: 'Shanghai',
    data: shanghai
  },
  {
    name: 'Istanbul',
    data: istanbul
  },
  {
    name: 'Moscow',
    data: moscow
  }
]

export { staticLocaleOptions }