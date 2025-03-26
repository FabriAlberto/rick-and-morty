import { render } from "@testing-library/react";
import CharacterEpisodesList from "@/components/RickAndMorty/CharacterEpisodesList";
import { api } from "@/services/api.service";

jest.mock("../services/api.service.ts", () => ({
  api: {
    getMultipleEpisodes: jest.fn().mockResolvedValue([
      {
        id: 1,
        episode: ["https:episode/1", "https:episode/2"],
        image: "image1.jpg",
        name: "test1",
        air_date: "16/10/2000",
      },
      {
        id: 2,
        episode: ["episode3", "episode4"],
        image: "image2.jpg",
        name: "test2",
        air_date: "16/10/2000",
      },
    ]),
  },
}));
const mockedApi = api as jest.Mocked<typeof api>;

describe("CharacterEpisodes", () => {
  it("should display a message asking to select two characters if one or both character IDs are missing", async () => {
    const { container } = render(
      await CharacterEpisodesList({
        episodesIds: [],
        title: "test",
        isCharactersSelected: false,
      })
    );
    expect(container.textContent).toContain(
      "Select two characters to see their episodes"
    );
  });

  it("should not display the message if isCharactersSelected=true", async () => {
    const { queryByText } = render(
      await CharacterEpisodesList({
        isCharactersSelected: true,
        title: "Character #1 - Only Episodes",
        episodesIds: ["1", "2"],
      })
    );

    expect(
      queryByText("Select two characters to see their episodes")
    ).not.toBeInTheDocument();
  });

  it("it should display a message that no episodes were found if the api responds with an empty array. ", async () => {
    mockedApi.getMultipleEpisodes.mockResolvedValueOnce([]);

    const { container } = render(
      await CharacterEpisodesList({
        isCharactersSelected: true,
        title: "Character #1 - Only Episodes",
        episodesIds: ["1", "2"],
      })
    );
    expect(container.textContent).toContain("No episodes found");
  });
});
