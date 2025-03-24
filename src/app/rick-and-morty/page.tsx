export const dynamic = "force-dynamic";
import CharacterList from "@/components/Home/CharacterList";
import { api } from "@/services/api.service";

const fetchCharacters = async () => {
  const response = await api.getCharacters();
  return response;
};
export default async function Home() {
  const charactersResponse = await fetchCharacters();

  return (
    
    <div>
      {charactersResponse && (
        <CharacterList charactersResponse={charactersResponse} />
      )}
    </div>
  );
}
