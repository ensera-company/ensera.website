import { MoveDirection, OutMode } from "@tsparticles/engine";

export class ParticlesConfig {
  static particlesOptions = {
    fpsLimit: 120,
    interactivity: {
      events: {
        // 🔹 Enable hover interaction
        onHover: {
          enable: true,
          mode: "connect", // you can change to 'grab', 'bubble', or combine ['repulse', 'connect']
        },
        // 🔹 Enable click interaction
        onClick: {
          enable: true,
          mode: "push", // adds particles when clicking
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4, // how many particles to add when clicking
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        grab: {
          distance: 150,
          links: {
            opacity: 0.5,
          },
        },
        bubble: {
          distance: 200,
          size: 8,
          duration: 2,
          opacity: 0.8,
        },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: { default: OutMode.bounce },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: { enable: true },
        value: 80,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    style: {
      "z-index": "1",
    },
    detectRetina: true,
  };
}
