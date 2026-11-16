
const state = { len: 40, rafter: 20, pitch: 1.1, rain: 6 };

function init() {
  const l = document.getElementById('gutterLen');
  const r = document.getElementById('roofRafter');
  const p = document.getElementById('roofPitch');
  const rn = document.getElementById('rainRate');

  l.addEventListener('input', e => { state.len = parseFloat(e.target.value)||0; calc(); });
  r.addEventListener('input', e => { state.rafter = parseFloat(e.target.value)||0; calc(); });
  p.addEventListener('change', e => { state.pitch = parseFloat(e.target.value)||1.1; calc(); });
  rn.addEventListener('change', e => { state.rain = parseFloat(e.target.value)||6; calc(); });
  calc();
}

function calc() {
  const physArea = state.len * state.rafter;
  const adjArea = physArea * state.pitch;

  // Flow rate: GPM = Adjusted Area * Rainfall Intensity (in/hr) * 0.0104
  const gpm = adjArea * state.rain * 0.0104;

  // 5" K-style handles up to ~35-40 GPM; 6" handles up to ~65-75 GPM
  let rec = "5-Inch K-Style";
  let recSub = "Standard Residential Capacity";
  if (gpm >= 38 || adjArea > 750) {
    rec = "6-Inch K-Style";
    recSub = "High Capacity (Prevents Overflow in Downpours)";
  }

  // Downspouts: 1 downspout per 30-35 ft of gutter or 1 per 600 sq ft
  const downspouts = Math.max(1, Math.ceil(state.len / 30));

  // Hangers: every 24 inches (2 ft) + 1 at each end
  const hangers = Math.ceil(state.len / 2) + 1;

  document.getElementById('gutterRec').textContent = rec;
  document.getElementById('gutterRecSub').textContent = recSub;
  document.getElementById('flowRate').textContent = `Peak Drainage: ${Math.round(gpm)} Gallons Per Minute`;
  document.getElementById('downspoutsCount').textContent = `${downspouts} Downspouts (3x4")`;
  document.getElementById('leafGuardLen').textContent = `${Math.round(state.len)} Linear ft`;
  document.getElementById('roofArea').textContent = `${Math.round(physArea)} sq ft`;
  document.getElementById('adjArea').textContent = `${Math.round(adjArea)} sq ft`;
  document.getElementById('hangerCount').textContent = `${hangers} Hidden Hangers`;
}
window.addEventListener('DOMContentLoaded', init);
