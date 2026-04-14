import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, staticFile} from "remotion";

type ParagraphSegment = {
	text: string;
	highlight?: boolean;
};

type Paragraph = {
	number: string;
	segments: ParagraphSegment[];
};

type GesetzesBlatt3DProps = {
	sourceName: string;
	sourceMeta: string;
	lawTitle: string;
	lawSection: string;
	paragraphs: Paragraph[];
	officialStamp?: string;
	paperTextureSrc?: string;
	variant?: "fullscreen" | "overlay";
	clusterOffsetX?: number;
};

export const GesetzesBlatt3D: React.FC<GesetzesBlatt3DProps> = ({
	sourceName,
	sourceMeta,
	lawTitle,
	lawSection,
	paragraphs,
	officialStamp,
	paperTextureSrc,
	variant = "fullscreen",
	clusterOffsetX = 0,
}) => {
	const frame = useCurrentFrame();
	const {width: canvasWidth, height: canvasHeight} = useVideoConfig();

	const PANEL_WIDTH_FULLSCREEN = 1440;
	const PANEL_HEIGHT_FULLSCREEN = 820;
	const PANEL_WIDTH_OVERLAY = 1080;
	const PANEL_HEIGHT_OVERLAY = 640;

	const PANEL_WIDTH = variant === "fullscreen" ? PANEL_WIDTH_FULLSCREEN : PANEL_WIDTH_OVERLAY;
	const PANEL_HEIGHT = variant === "fullscreen" ? PANEL_HEIGHT_FULLSCREEN : PANEL_HEIGHT_OVERLAY;

	const PADDING_X = 72;
	const PADDING_TOP = 52;

	const SERIF_STACK = '"Georgia", "Times New Roman", "Didot", serif';
	const SANS_STACK = '"Inter", -apple-system, sans-serif';

	// Panel entry animation
	const panelOpacity = interpolate(frame, [0, 28], [0, 1], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const panelBlur = interpolate(frame, [0, 28], [12, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const glassPanelStyle: React.CSSProperties = {
		position: "absolute",
		width: PANEL_WIDTH,
		height: PANEL_HEIGHT,
		left: "50%",
		top: "50%",
		marginLeft: -PANEL_WIDTH / 2,
		marginTop: -PANEL_HEIGHT / 2,
		backgroundColor: paperTextureSrc ? "rgba(10, 8, 4, 1)" : "rgba(22, 18, 12, 0.78)",
		backdropFilter: "blur(24px) saturate(1.15)",
		WebkitBackdropFilter: "blur(24px) saturate(1.15)",
		border: "1px solid rgba(255, 200, 120, 0.24)",
		borderRadius: 14,
		boxShadow:
			"0 30px 90px rgba(0, 0, 0, 0.7), " +
			"0 10px 40px rgba(0,0,0,0.4), " +
			"inset 0 1px 0 rgba(255,255,255,0.08), " +
			"inset 0 -1px 0 rgba(0,0,0,0.3)",
		opacity: panelOpacity,
		filter: `blur(${panelBlur}px)`,
		overflow: "hidden",
	};

	const LAW_TITLE_TOP = PADDING_TOP + 80;
	const PARAS_TOP = LAW_TITLE_TOP + 130;

	return (
		<AbsoluteFill style={{
			background: "radial-gradient(ellipse 80% 60% at 50% 45%, #0d1022 0%, #05060e 60%, #020308 100%)",
			perspective: "1800px",
			perspectiveOrigin: "50% 50%",
		}}>
			<div style={{
				position: "absolute",
				inset: 0,
				transformStyle: "preserve-3d",
				transform: `translateX(${clusterOffsetX}px) rotateX(3deg) rotateY(-12deg)`,
			}}>
				<div style={glassPanelStyle}>
					{paperTextureSrc && (
						<img
							src={paperTextureSrc}
							style={{
								position: "absolute",
								inset: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								opacity: 1.0,
								filter: "brightness(0.32) sepia(0.55) saturate(1.25) contrast(1.15)",
								pointerEvents: "none",
							}}
						/>
					)}

					<div style={{
						position: "absolute",
						top: PADDING_TOP,
						left: PADDING_X,
						right: PADDING_X,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "baseline",
					}}>
						<div style={{
							fontFamily: SANS_STACK,
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: "0.24em",
							textTransform: "uppercase",
							color: "rgba(255, 255, 255, 0.92)",
							display: "flex",
						}}>
							{sourceName.split("").map((ch, i) => {
								const charFrame = frame - 10 - i * 1.2;
								const charOp = interpolate(charFrame, [0, 12], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
								const charY = interpolate(charFrame, [0, 12], [8, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
								return (
									<span key={i} style={{display: "inline-block", opacity: charOp, transform: `translateY(${charY}px)`, whiteSpace: "pre"}}>
										{ch === " " ? "\u00A0" : ch}
									</span>
								);
							})}
						</div>

						<div style={{
							fontFamily: SANS_STACK,
							fontSize: 16,
							fontWeight: 600,
							letterSpacing: "0.14em",
							textTransform: "uppercase",
							color: "rgba(255, 200, 120, 0.75)",
							opacity: interpolate(frame, [18, 34], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
						}}>
							{sourceMeta}
						</div>
					</div>

					<div style={{
						position: "absolute",
						top: PADDING_TOP + 40,
						left: PADDING_X,
						width: PANEL_WIDTH - PADDING_X * 2,
						height: 2,
						backgroundColor: "rgba(255, 200, 120, 0.55)",
						transformOrigin: "left center",
						transform: `scaleX(${interpolate(frame, [22, 42], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)})})`,
						boxShadow: "0 0 14px rgba(255, 200, 120, 0.3)",
					}} />

					<div style={{
						position: "absolute",
						top: LAW_TITLE_TOP,
						left: PADDING_X,
						right: PADDING_X,
						fontFamily: SERIF_STACK,
						fontSize: 52,
						fontWeight: 900,
						letterSpacing: "-0.01em",
						lineHeight: 1.0,
						color: "#ffffff",
						textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
						display: "flex",
						flexWrap: "wrap",
					}}>
						{lawTitle.split("").map((ch, i) => {
							const charFrame = frame - 30 - i * 1.5;
							const charOp = interpolate(charFrame, [0, 14], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
							const charY = interpolate(charFrame, [0, 14], [14, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
							return (
								<span key={i} style={{display: "inline-block", opacity: charOp, transform: `translateY(${charY}px)`, whiteSpace: "pre"}}>
									{ch === " " ? "\u00A0" : ch}
								</span>
							);
						})}
					</div>

					<div style={{
						position: "absolute",
						top: LAW_TITLE_TOP + 70,
						left: PADDING_X,
						right: PADDING_X,
						fontFamily: SERIF_STACK,
						fontSize: 28,
						fontWeight: 700,
						letterSpacing: "0.02em",
						color: "rgba(255, 200, 120, 0.85)",
						opacity: interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
					}}>
						{lawSection}
					</div>

					<div style={{
						position: "absolute",
						top: PARAS_TOP,
						left: PADDING_X,
						right: PADDING_X,
						maxHeight: PANEL_HEIGHT - PARAS_TOP - 100,
						overflow: "hidden",
					}}>
						{paragraphs.map((para, pIdx) => {
							const paraDelay = 50 + pIdx * 25;
							const paraOp = interpolate(frame, [paraDelay, paraDelay + 22], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});
							const paraY = interpolate(frame, [paraDelay, paraDelay + 22], [10, 0], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
								easing: Easing.bezier(0.16, 1, 0.3, 1),
							});
							const highlightProgress = interpolate(frame, [paraDelay + 22, paraDelay + 40], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
								easing: Easing.bezier(0.16, 1, 0.3, 1),
							});

							return (
								<div key={pIdx} style={{
									display: "flex",
									alignItems: "flex-start",
									gap: 16,
									marginBottom: 22,
									opacity: paraOp,
									transform: `translateY(${paraY}px)`,
								}}>
									<span style={{
										fontFamily: SERIF_STACK,
										fontSize: 22,
										fontWeight: 700,
										color: "#ffd77a",
										flexShrink: 0,
										width: 48,
									}}>
										{para.number}
									</span>
									<div style={{
										fontFamily: SERIF_STACK,
										fontSize: 22,
										fontWeight: 400,
										lineHeight: 1.5,
										color: "rgba(255, 255, 255, 0.88)",
										flex: 1,
									}}>
										{para.segments.map((seg, sIdx) => {
											if (seg.highlight) {
												return (
													<span key={sIdx} style={{
														display: "inline",
														backgroundColor: `rgba(255, 200, 60, ${0.18 * highlightProgress})`,
														borderBottom: `2px solid rgba(255, 200, 60, ${0.75 * highlightProgress})`,
														padding: "2px 4px",
														color: highlightProgress > 0.5 ? "#ffe58a" : "rgba(255, 255, 255, 0.88)",
														transition: "none",
														fontWeight: 600,
													}}>
														{seg.text}
													</span>
												);
											}
											return <span key={sIdx}>{seg.text}</span>;
										})}
									</div>
								</div>
							);
						})}
					</div>

					{officialStamp && (
						<div style={{
							position: "absolute",
							bottom: 40,
							right: 60,
							padding: "14px 26px",
							border: "3px solid rgba(200, 40, 40, 0.7)",
							borderRadius: 6,
							fontFamily: SANS_STACK,
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: "0.2em",
							textTransform: "uppercase",
							color: "rgba(200, 40, 40, 0.85)",
							textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
							transform: `rotate(${interpolate(frame, [130, 155], [-12, -6], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)})}deg) scale(${interpolate(frame, [130, 150, 160], [0.4, 1.15, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})})`,
							transformOrigin: "center",
							opacity: interpolate(frame, [130, 155], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
							boxShadow: "0 0 20px rgba(200, 40, 40, 0.25)",
						}}>
							{officialStamp}
						</div>
					)}
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const DemoSceneGesetzesBlatt3D: React.FC = () => {
	return (
		<GesetzesBlatt3D
			sourceName="BUNDESGESETZBLATT"
			sourceMeta="TEIL I · NR. 42 · 14. APRIL 2026"
			lawTitle="GELDWÄSCHEGESETZ"
			lawSection="§ 10  ALLGEMEINE SORGFALTSPFLICHTEN"
			paragraphs={[
				{
					number: "(1)",
					segments: [
						{text: "Die Verpflichteten haben bei jeder Transaktion die Identität ihres Vertragspartners zu prüfen, wenn "},
						{text: "ein Betrag von 10.000 Euro überschritten wird", highlight: true},
						{text: "."},
					],
				},
				{
					number: "(2)",
					segments: [
						{text: "Bei einem konkreten Verdacht auf Geldwäsche sind "},
						{text: "alle Transaktionen zu melden", highlight: true},
						{text: ", unabhängig vom Betrag."},
					],
				},
				{
					number: "(3)",
					segments: [
						{text: "Die Meldung hat unverzüglich an die zuständige Behörde zu erfolgen."},
					],
				},
			]}
			officialStamp="AMTLICH · GEPRÜFT"
			paperTextureSrc={staticFile("paper-crumpled.jpg")}
			variant="fullscreen"
		/>
	);
};

export default DemoSceneGesetzesBlatt3D;