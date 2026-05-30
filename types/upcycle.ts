export interface PatchOption {
    id: string;
    image: string;
    price: number;
  }
  
  export interface UpcycleState {
    selectedPatch: string | null;
    customPatch: File | null;
  }
  
  