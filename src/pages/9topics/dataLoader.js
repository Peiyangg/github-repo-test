// Adjust this to match your GitHub repository name
const BASE_PATH = '/github-repo-test';

async function fetchWithErrorHandling(url) {
  try {
    const fullUrl = `${BASE_PATH}${url}`;
    console.log('Fetching from:', fullUrl); // For debugging
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

export async function loadData() {
  return fetchWithErrorHandling('/heatmap_JSD_9_43.json');
}

export async function loadTopicData() {
  return fetchWithErrorHandling('/topic_9_all_check.json');
}

export async function loadData_Diagnosis() {
  return fetchWithErrorHandling('/heatmap_JSD_9_43_Diagnosis.json');
}

export async function loadData_Treatment() {
  return fetchWithErrorHandling('/heatmap_JSD_9_43_Treatment.json');
}

export async function loadData_SampleTime() {
  return fetchWithErrorHandling('/heatmap_JSD_9_43_SampleTime.json');
}