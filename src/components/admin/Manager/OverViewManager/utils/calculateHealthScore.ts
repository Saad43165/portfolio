import { useData } from "../../../../../context/DataContext";

export const calculateHealthScore = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { projects, skills, experiences, education } = useData();
  const totalItems = projects.length + skills.length + experiences.length + education.length;
  const maxItems = 20;
  const score = Math.min((totalItems / maxItems) * 10, 10);
  return score.toFixed(1);
};