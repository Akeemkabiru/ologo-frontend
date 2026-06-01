"use client";

export default function VantaClouds() {
  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-b from-violet-400 via-purple-200 to-violet-100" />

      {/* Animated SVG Cloud Shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.7 }}
      >
        <defs>
          <style>{`
            @keyframes float1 {
              0%, 100% { transform: translateX(0px) translateY(0px); }
              50% { transform: translateX(80px) translateY(-25px); }
            }
            @keyframes float2 {
              0%, 100% { transform: translateX(0px) translateY(0px); }
              50% { transform: translateX(-100px) translateY(30px); }
            }
            @keyframes float3 {
              0%, 100% { transform: translateX(0px) translateY(0px); }
              50% { transform: translateX(90px) translateY(20px); }
            }
            @keyframes float4 {
              0%, 100% { transform: translateX(0px) translateY(0px); }
              50% { transform: translateX(-70px) translateY(-35px); }
            }
            @keyframes float5 {
              0%, 100% { transform: translateX(0px) translateY(0px); }
              50% { transform: translateX(60px) translateY(15px); }
            }
            .cloud1 { animation: float1 12s ease-in-out infinite; }
            .cloud2 { animation: float2 15s ease-in-out infinite; }
            .cloud3 { animation: float3 14s ease-in-out infinite; }
            .cloud4 { animation: float4 16s ease-in-out infinite; }
            .cloud5 { animation: float5 13s ease-in-out infinite; }
          `}</style>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Cloud shapes with smooth motion */}
        <g className="cloud1" filter="url(#blur)">
          <ellipse
            cx="200"
            cy="150"
            rx="80"
            ry="45"
            fill="white"
            opacity="0.45"
          />
          <ellipse
            cx="150"
            cy="170"
            rx="70"
            ry="40"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="250"
            cy="165"
            rx="75"
            ry="42"
            fill="white"
            opacity="0.42"
          />
          <ellipse
            cx="210"
            cy="120"
            rx="65"
            ry="35"
            fill="white"
            opacity="0.47"
          />
        </g>

        <g className="cloud2" filter="url(#blur)">
          <ellipse
            cx="1600"
            cy="250"
            rx="90"
            ry="50"
            fill="white"
            opacity="0.42"
          />
          <ellipse
            cx="1540"
            cy="275"
            rx="75"
            ry="42"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="1660"
            cy="270"
            rx="80"
            ry="45"
            fill="white"
            opacity="0.41"
          />
          <ellipse
            cx="1620"
            cy="220"
            rx="70"
            ry="38"
            fill="white"
            opacity="0.44"
          />
        </g>

        <g className="cloud3" filter="url(#blur)">
          <ellipse
            cx="800"
            cy="100"
            rx="85"
            ry="48"
            fill="white"
            opacity="0.44"
          />
          <ellipse
            cx="750"
            cy="125"
            rx="72"
            ry="41"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="850"
            cy="120"
            rx="78"
            ry="44"
            fill="white"
            opacity="0.42"
          />
          <ellipse
            cx="800"
            cy="65"
            rx="68"
            ry="36"
            fill="white"
            opacity="0.46"
          />
        </g>

        <g className="cloud4" filter="url(#blur)">
          <ellipse
            cx="400"
            cy="350"
            rx="95"
            ry="52"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="340"
            cy="375"
            rx="78"
            ry="44"
            fill="white"
            opacity="0.36"
          />
          <ellipse
            cx="460"
            cy="370"
            rx="82"
            ry="46"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="400"
            cy="310"
            rx="72"
            ry="40"
            fill="white"
            opacity="0.41"
          />
        </g>

        <g className="cloud5" filter="url(#blur)">
          <ellipse
            cx="1200"
            cy="400"
            rx="88"
            ry="50"
            fill="white"
            opacity="0.43"
          />
          <ellipse
            cx="1150"
            cy="420"
            rx="73"
            ry="42"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="1250"
            cy="415"
            rx="80"
            ry="46"
            fill="white"
            opacity="0.41"
          />
          <ellipse
            cx="1200"
            cy="360"
            rx="70"
            ry="38"
            fill="white"
            opacity="0.44"
          />
        </g>

        {/* Additional clouds for density */}
        <g
          className="cloud1"
          filter="url(#blur)"
          style={{ animationDelay: "1s" }}
        >
          <ellipse
            cx="600"
            cy="280"
            rx="92"
            ry="52"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="540"
            cy="300"
            rx="78"
            ry="44"
            fill="white"
            opacity="0.37"
          />
          <ellipse
            cx="660"
            cy="295"
            rx="85"
            ry="48"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="600"
            cy="240"
            rx="72"
            ry="40"
            fill="white"
            opacity="0.42"
          />
        </g>

        <g
          className="cloud2"
          filter="url(#blur)"
          style={{ animationDelay: "2s" }}
        >
          <ellipse
            cx="1100"
            cy="180"
            rx="86"
            ry="48"
            fill="white"
            opacity="0.41"
          />
          <ellipse
            cx="1050"
            cy="205"
            rx="74"
            ry="42"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="1150"
            cy="200"
            rx="80"
            ry="45"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="1100"
            cy="145"
            rx="70"
            ry="38"
            fill="white"
            opacity="0.43"
          />
        </g>

        <g
          className="cloud3"
          filter="url(#blur)"
          style={{ animationDelay: "3s" }}
        >
          <ellipse
            cx="300"
            cy="500"
            rx="94"
            ry="54"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="240"
            cy="525"
            rx="80"
            ry="46"
            fill="white"
            opacity="0.35"
          />
          <ellipse
            cx="360"
            cy="520"
            rx="87"
            ry="50"
            fill="white"
            opacity="0.37"
          />
          <ellipse
            cx="300"
            cy="460"
            rx="74"
            ry="42"
            fill="white"
            opacity="0.40"
          />
        </g>

        <g
          className="cloud4"
          filter="url(#blur)"
          style={{ animationDelay: "4s" }}
        >
          <ellipse
            cx="1400"
            cy="550"
            rx="89"
            ry="50"
            fill="white"
            opacity="0.42"
          />
          <ellipse
            cx="1350"
            cy="575"
            rx="76"
            ry="43"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="1450"
            cy="570"
            rx="82"
            ry="47"
            fill="white"
            opacity="0.41"
          />
          <ellipse
            cx="1400"
            cy="510"
            rx="71"
            ry="39"
            fill="white"
            opacity="0.43"
          />
        </g>

        <g
          className="cloud5"
          filter="url(#blur)"
          style={{ animationDelay: "2.5s" }}
        >
          <ellipse
            cx="900"
            cy="600"
            rx="91"
            ry="51"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="850"
            cy="625"
            rx="77"
            ry="44"
            fill="white"
            opacity="0.37"
          />
          <ellipse
            cx="950"
            cy="620"
            rx="84"
            ry="48"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="900"
            cy="560"
            rx="72"
            ry="40"
            fill="white"
            opacity="0.42"
          />
        </g>

        <g
          className="cloud1"
          filter="url(#blur)"
          style={{ animationDelay: "5s" }}
        >
          <ellipse
            cx="500"
            cy="200"
            rx="87"
            ry="49"
            fill="white"
            opacity="0.41"
          />
          <ellipse
            cx="450"
            cy="225"
            rx="75"
            ry="42"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="550"
            cy="220"
            rx="81"
            ry="46"
            fill="white"
            opacity="0.40"
          />
          <ellipse
            cx="500"
            cy="160"
            rx="70"
            ry="38"
            fill="white"
            opacity="0.43"
          />
        </g>

        <g
          className="cloud2"
          filter="url(#blur)"
          style={{ animationDelay: "1.5s" }}
        >
          <ellipse
            cx="1300"
            cy="80"
            rx="93"
            ry="53"
            fill="white"
            opacity="0.39"
          />
          <ellipse
            cx="1250"
            cy="105"
            rx="79"
            ry="45"
            fill="white"
            opacity="0.36"
          />
          <ellipse
            cx="1350"
            cy="100"
            rx="86"
            ry="49"
            fill="white"
            opacity="0.38"
          />
          <ellipse
            cx="1300"
            cy="40"
            rx="73"
            ry="41"
            fill="white"
            opacity="0.41"
          />
        </g>
      </svg>
    </div>
  );
}
