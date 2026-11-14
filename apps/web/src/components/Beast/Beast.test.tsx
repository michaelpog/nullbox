import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { BeastMood } from "../../api/generated/BeastMood";
import { CopyProvider } from "../../copy/CopyProvider";
import { Beast } from "./Beast";

describe("Beast", () => {
  it("shows the mood in English", () => {
    render(
      <CopyProvider locale="en">
        <Beast mood="kaiju" />
      </CopyProvider>,
    );
    expect(screen.getByText("Hammer raised. Nobody is safe.")).toBeInTheDocument();
    expect(document.querySelector("[data-mood=kaiju]")).not.toBeNull();
  });

  it("shows the mood in Japanese", () => {
    render(
      <CopyProvider locale="ja">
        <Beast mood="asleep" />
      </CopyProvider>,
    );
    expect(screen.getByText("受信箱ゼロ。工具箱の上でお昼寝中。")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("ja");
  });

  it.each<[BeastMood, string]>([
    ["asleep", "Handyman Beast, happy and napping"],
    ["peckish", "Handyman Beast, busy and focused"],
    ["grumpy", "Handyman Beast, grumpy and steaming"],
    ["kaiju", "Handyman Beast, furious with hammer raised"],
  ])("draws the handyman mascot for %s", (mood, label) => {
    render(
      <CopyProvider locale="en">
        <Beast mood={mood} />
      </CopyProvider>,
    );
    expect(screen.getByRole("img", { name: label })).toBeInTheDocument();
  });
});
