export const storage = {
  saveData: (projects) => {
    localStorage.setItem("projectsData", JSON.stringify(projects));
  },
  loadData: () => {
    const data = localStorage.getItem("projectsData");
    return data ? JSON.parse(data) : [];
  },
};
