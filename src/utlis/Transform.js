const transformUniversityList = data => {
  return (
    data &&
    data.map(item => {
      return {
        universityName: item.name,
        country: item.country,
        website: item.domains && item.domains[0],
      };
    })
  );
};

export default transformUniversityList;
