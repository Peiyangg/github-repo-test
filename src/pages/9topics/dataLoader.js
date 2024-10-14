export async function loadData() {
    const response = await fetch('/heatmap_JSD_9_43.json'); // Directly references the static folder
    const data = await response.json();
    return data;
  }


  export async function loadTopicData() {
    const response = await fetch('/topic_9.json');
    const data = await response.json();
    return data;
  }

  export async function loadData_Diagnosis() {
    const response = await fetch('/heatmap_JSD_9_43_Diagnosis.json'); // Directly references the static folder
    const data = await response.json();
    return data;
  }

  export async function loadData_Treatment() {
    const response = await fetch('/heatmap_JSD_9_43_Treatment.json'); // Directly references the static folder
    const data = await response.json();
    return data;
  }

  export async function loadData_SampleTime() {
    const response = await fetch('/heatmap_JSD_9_43_SampleTime.json'); // Directly references the static folder
    const data = await response.json();
    return data;
  }

  
  