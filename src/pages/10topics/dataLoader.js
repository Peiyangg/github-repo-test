export async function loadData() {
  const response = await fetch('/heatmap_JSD_10_42.json'); // Directly references the static folder
  const data = await response.json();
  return data;
}


export async function loadTopicData() {
  const response = await fetch('/topic_10.json');
  const data = await response.json();
  return data;
}

export async function loadData_Diagnosis() {
  const response = await fetch('/heatmap_JSD_10_42_Diagnosis.json'); // Directly references the static folder
  const data = await response.json();
  return data;
}

export async function loadData_Treatment() {
  const response = await fetch('/heatmap_JSD_10_42_Treatment.json'); // Directly references the static folder
  const data = await response.json();
  return data;
}

export async function loadData_SampleTime() {
  const response = await fetch('/heatmap_JSD_10_42_SampleTime.json'); // Directly references the static folder
  const data = await response.json();
  return data;
}


