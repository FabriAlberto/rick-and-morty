import { render, screen, fireEvent } from "@testing-library/react";
import ButtonResetCharacters from "../components/RickAndMorty/ButtonResetCharacters";
import { useRamContext } from "@/context/rickAndMortyContext/ramContext";

jest.mock("../context/rickAndMortyContext/ramContext", () => ({
  useRamContext: jest.fn(),
}));

describe("ButtonResetCharacters", () => {
  it("should display the button only when there is a character selected in the section", () => {
    (useRamContext as jest.Mock).mockReturnValue({
      charactersSelected: {
        character1: { id: 1, name: "Rick" },
        character2: null,
      },
      resetSelection: jest.fn(),
    });

    render(<ButtonResetCharacters sectionName="character1" />);
    expect(screen.getByText("Remove selection ❌")).toBeInTheDocument();

  });
  it("should hide the button when there is no character selected in the section", () => {
    (useRamContext as jest.Mock).mockReturnValue({
      charactersSelected: { character1: null, character2: null },
      resetSelection: jest.fn(),
    });

    render(<ButtonResetCharacters sectionName="character1" />);
    expect(screen.queryByText("Remove selection ❌")).not.toBeInTheDocument();
  });
  it("must call resetSelection when the button is clicked. ", () => {
    const resetSelectionMock = jest.fn();
    (useRamContext as jest.Mock).mockReturnValue({
      charactersSelected: {
        character1: { id: 1, name: "Rick" },
        character2: null,
      },
      resetSelection: resetSelectionMock,
    });

    render(<ButtonResetCharacters sectionName="character1" />);

    fireEvent.click(screen.getByText("Remove selection ❌"));

    expect(resetSelectionMock).toHaveBeenCalledWith("character1");
  });
});
