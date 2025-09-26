"use client";
if (loading) return <div style={{ padding: 12 }}>読み込み中…</div>;
if (error) return <div style={{ padding: 12 }}>{error}</div>;


const topN = sorted.slice(0, 20);


return (
<div className="map-root">
<div className="header">
<h1>安心マップ（ベータ版）</h1>
<div className="actions">
<a className="button" href="tel:119">119 に電話</a>
<a className="button" target="_blank" rel="noreferrer" href="https://www.city.tsuchiura.lg.jp/">自治体公式</a>
</div>
</div>


<div className="legend">
<div>● 緑: 夜間対応あり　/　● 灰: 夜間対応なし</div>
</div>


<MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
<TileLayer
attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
{topN.map((h) => (
<Marker
key={h.id}
position={[h.lat, h.lng]}
icon={new L.Icon({
iconUrl: h.night_service ? iconBase + "marker-icon.png" : iconBase + "marker-icon.png",
shadowUrl: iconBase + "marker-shadow.png",
iconSize: [25, 41],
iconAnchor: [12, 41],
popupAnchor: [1, -34],
shadowSize: [41, 41],
className: h.night_service ? "marker-green" : "marker-gray",
})}
>
<Popup>
<div style={{ minWidth: 220 }}>
<strong>{h.name}</strong>
<div>診療科: {h.departments?.join("、") || "-"}</div>
<div>夜間対応: {h.night_service ? "あり" : "なし"}</div>
<div>距離: {h.distanceKm.toFixed(2)} km</div>
{h.tel && (
<div style={{ marginTop: 6 }}>
<a href={`tel:${h.tel.replace(/[^0-9+]/g, "")}`}>電話する</a>
</div>
)}
{h.official && (
<div>
<a href={h.official} target="_blank" rel="noreferrer">公式ページ</a>
</div>
)}
</div>
</Popup>
</Marker>
))}
</MapContainer>


<div className="footer">
<div>
※緊急時はためらわず <strong>119</strong> に通報してください。データの正確性は保証されません。公式情報を優先してください。最終更新: <span id="updatedAt">2025-09-26</span>
</div>
<div>
地図タイル: © OpenStreetMap contributors
</div>
</div>
</div>
);
}
